import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Register } from '../../../shared/model/register.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  // styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  registerData: Register = new Register();

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.registerForm = this.fb.group(
      {
        name: [this.registerData.name, [Validators.required]],
        email: [
          this.registerData.email,
          [Validators.required, Validators.email],
        ],
        password: [
          this.registerData.password,
          [Validators.required, Validators.minLength(6)],
        ],
        confirmPassword: [
          this.registerData.confirmPassword,
          [Validators.required],
        ],
      },
      { validator: this.checkPasswords }
    );
  }

  checkPasswords(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notSame: true };
  }

  onSubmit(): void {
    if (this.registerForm.valid) {
      this.registerData = this.registerForm.value;
      this.authService.register(this.registerData).subscribe(
        (response) => {
          console.log('User registered successfully:', response);
          // Handle successful registration (e.g., redirect to login page)
        },
        (error) => {
          console.log('Registration error:', error);
        }
      );
    } else {
      console.log('Form not valid');
    }
  }

  // onSubmit() {
  //   if (this.registerForm.valid) {
  //     console.log(this.registerForm.value);
  //   }
  // }
}
