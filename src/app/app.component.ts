import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  passwordMatche = false;
  mySuperForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,

      Validators.pattern(
        '^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,}$).+'
      ),
    ]),
    confirmPassword: new FormControl('', Validators.required),
  });

  nameError() {
    const nameControl = this.mySuperForm.get('name');
    if (!nameControl) return false;

    return (
      nameControl.touched &&
      (nameControl.hasError('required') || nameControl.hasError('minlength'))
    );
  }

  emailError() {
    const emailControl = this.mySuperForm.get('email');
    if (!emailControl) return false;

    return (
      emailControl.touched &&
      (emailControl.hasError('required') || emailControl.hasError('email'))
    );
  }

  mySuperFunctionSubmit() {
    this.passwordMatche = this.mySuperForm.value.password === this.mySuperForm.value.confirmPassword;
    if (!this.passwordMatche) {
      console.log('🚀 Passwords do not match! 🔥');
      return false;
    }
    if (this.mySuperForm.invalid) {
      console.log('🚀 Form invalid! 🔥');
      return;
    }
    console.log('🚀 Form submitted! 🔥');
    console.log(this.mySuperForm.value);
    return;
  }
}
