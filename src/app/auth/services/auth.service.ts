import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

import { LoginResponse, User } from '../interfaces';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { environment } from '../../../environments/environment';
import { CheckTokenResponse } from '../interfaces/check-token-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly baseURL: string = environment.baseURL;
  private http = inject(HttpClient);

  private readonly _currentUser = signal<User|null>(null);
  private readonly _authStatus = signal<AuthStatus>( AuthStatus.checking );

  public currentUser = computed(() => this._currentUser());
  public authStatus = computed(() => this._authStatus());

  constructor() {
    this.checkToken().subscribe();
  }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseURL}/auth/login`;
    const body = { email, password };

   return this.http.post<LoginResponse>(url, body)
          .pipe(
            tap(({user, token}) => {
              this.setAuthentication(user, token);
            }),
            map(() => true),
            catchError((err) => {
              this._authStatus.set( AuthStatus.notAuthenticated );
              return throwError(() => err.error.message)
            })
          );
  }

  checkToken() {
    const token = localStorage.getItem('token');
    const url = `${this.baseURL}/auth/check-token`;

    if(!token) {
      this.logout();
      return of(false);
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<CheckTokenResponse>(url, { headers })
      .pipe(
        tap(({user, token}) => {
          this.setAuthentication(user, token);
        }),
        map(() => true),
        catchError(() => {
          this._authStatus.set( AuthStatus.notAuthenticated );
          return of(false);
        })
      )

  }

  private setAuthentication(user: User, token: string) {
    this._currentUser.set(user);
    this._authStatus.set( AuthStatus.authenticated );
    localStorage.setItem('token', token);
  }

  public logout() {
    localStorage.removeItem('token');
    this._authStatus.set( AuthStatus.notAuthenticated );
    this._currentUser.set(null);
  }

}
