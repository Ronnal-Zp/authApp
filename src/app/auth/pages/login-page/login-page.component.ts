import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import Swal from 'sweetalert2'

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule],
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  private fb = inject(FormBuilder);
  private router = inject(Router);
  private AuthService = inject(AuthService);

  public formLogin: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit() {
    const { email, password } = this.formLogin.value;
    this.AuthService.login(email, password)
      .subscribe({
        next: (success) => {
          this.router.navigate(['dashboard']);
        },
        error: (message) => {
          Swal.fire({
            title: '¡Error!',
            text: message,
            icon: 'error'
          })
        }
      });
  }

}
