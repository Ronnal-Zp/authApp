import { computed, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, tap, throwError } from 'rxjs';

import { LoginResponse, User } from '../interfaces';
import { AuthStatus } from '../interfaces/auth-status.enum';
import { environment } from '../../../environments/environment';

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

  constructor() { }

  login(email: string, password: string): Observable<boolean> {
    const url = `${this.baseURL}/auth/login`;
    const body = { email, password };

   return this.http.post<LoginResponse>(url, body)
          .pipe(
            tap(({user, token}) => {
              this._currentUser.set(user);
              this._authStatus.set( AuthStatus.authenticated );
              localStorage.setItem('token', token);
            }),

            map(() => true),
            catchError((err) => {
              return throwError(() => err.error.message)
            })
          );
  }


}
