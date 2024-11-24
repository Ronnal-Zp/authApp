import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { FormValidationsService } from '../../services/form-validations.service';
import { validatorEmail } from '../../validators';

@Component({
  selector: 'app-register-page',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register-page.component.html',
  styleUrl: './register-page.component.css'
})
export class RegisterPageComponent {

  private fb = inject(FormBuilder);
  public formValidations = inject(FormValidationsService);

  public formRegister: FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(4)]],
    email: ['', [Validators.required, validatorEmail()]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })

  onSubmit() {
    console.log('values', this.formRegister.value);
  }

}
