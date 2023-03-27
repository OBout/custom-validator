import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-password-form',
  templateUrl: './password-form.component.html',
  styleUrls: ['./password-form.component.scss']
})
export class PasswordFormComponent {
  passwordForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.passwordForm = this.createForm();
  }

  createForm(): FormGroup {
    return this.formBuilder.group({
      password: ['', [Validators.required, this.passwordValidator]]
    });
  }

  passwordValidator(control: AbstractControl): ValidationErrors | null {
    const value = control.value as string;

    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLowerCase = /[a-z]/.test(value);
    const hasNumber = /[0-9]/.test(value);
    const hasValidLength = value.length >= 8;

    if (hasUpperCase && hasLowerCase && hasNumber && hasValidLength) {
      return null;
    }

    return {
      passwordRequirements: {
        hasUpperCase,
        hasLowerCase,
        hasNumber,
        hasValidLength,
      },
    };
  }

  pwe (){
    return this.passwordForm.get('password')?.errors?.['passwordRequirements'];  
  }

  onSubmit() {
    if (this.passwordForm.valid) {
      console.log('Password is valid:', this.passwordForm.value);
    } else {
      console.log('Password is not valid:', this.passwordForm.value);
    }
  }
}

