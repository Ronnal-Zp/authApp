import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormValidationsService {

  constructor() { }

  public isInvalidFormInput(control: AbstractControl|null) {
    if(!control) false;
    return control?.invalid && control.touched;
  }

  public getValidationMessage(errors: ValidationErrors|null|undefined): string {
    if(!errors) return '';

    const keys = Object.keys(errors);
    let message = '';

    switch (keys[0]) {
      case 'required':
        message = 'Este campo es requerido.';
        break;

      case 'minlength':
        message = `Minimo de ${ errors['minlength']['requiredLength'] } caracteres.`;
        break;

      case 'emailError':
        message = errors['emailError'];
        break;

      default:
        break;
    }

    return message;
  }

}
