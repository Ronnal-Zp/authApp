import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function validatorEmail(): ValidatorFn {
    return (control:AbstractControl) : ValidationErrors | null => {
      const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
      const email = control.value;

      if (email == '') {
        return {
          'emailError': 'No existe email.'
        };
      }

      if(!regexEmail.test(email)) {
        return {
          'emailError': 'Email invalido.'
        }
      }

      return null;
    }
}
