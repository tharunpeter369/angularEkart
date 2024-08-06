import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterLink } from '@angular/router';

import { Login } from '../../../shared/model/login.model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink, FormsModule],
  templateUrl: './login.component.html',
  // styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loginData: Login = new Login();

  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.loginForm = this.fb.group({
      username: [this.loginData.username, [Validators.required]],
      password: [this.loginData.password, [Validators.required]],
    });
  }

  ngOnInit(): void {
    // console.log('just a funciton that work on initialize');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      this.loginData = this.loginForm.value;
      this.authService
        .login(this.loginData.username, this.loginData.password)
        .subscribe((response) => {
          if (response.length) {
            console.log('User logged in:', response[0]);
            // Handle successful login (e.g., redirect to dashboard)
          } else {
            console.log('Invalid credentials');
          }
        });
    } else {
      console.log('Form not valid');
    }
  }
}
