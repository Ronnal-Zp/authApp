import { Component, computed, effect, inject } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './auth/services/auth.service';
import { AuthStatus } from './auth/interfaces/auth-status.enum';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'authApp';

  private authService = inject(AuthService);
  private router = inject(Router);

  public finishedAuthCheck = computed<boolean>(() => {
    console.log('authStatus', this.authService.authStatus());

    if(this.authService.authStatus() == AuthStatus.checking) {
      return false;
    }

    return true;
  });


  public authStatusChangeEffect = effect(() => {
    console.log('authStatus2', this.authService.authStatus());

    switch (this.authService.authStatus()) {
      case AuthStatus.checking:
        break;

      case AuthStatus.authenticated:
        this.router.navigateByUrl('/dashboard');
        break;

      case AuthStatus.notAuthenticated:
        // this.router.navigateByUrl('/auth/login');
        break;
    }
  })


}
