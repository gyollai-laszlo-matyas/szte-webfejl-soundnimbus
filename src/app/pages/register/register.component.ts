import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { User } from '../../model/User';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  signUpForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    rePassword: new FormControl('', [Validators.required]),
  });
  
  showForm = true;
  signupError = '';

  constructor(private router: Router, private authService: AuthService) {}

  signup(): void {
    if (this.signUpForm.invalid) {
      this.signupError = 'Invalid credentials.';
      return;
    }

    const nameV = this.signUpForm.get('name')?.value;
    const emailV = this.signUpForm.get('email')?.value;
    const passwordV = this.signUpForm.get('password')?.value;
    const rePasswordV = this.signUpForm.get('rePassword')?.value;

    if (passwordV !== rePasswordV) {
      return;
    }

    this.showForm = false;

    const userData: Partial<User> = {
      name: nameV || '',
      email: emailV || '',
      bio: ''
    };

    const email = this.signUpForm.value.email || '';
    const pw = this.signUpForm.value.password || '';

    this.authService.signUp(email, pw, userData)
      .then(userCredential => {
        console.log('Registration succesful:', userCredential.user);
        this.authService.updateLoginStatus(true);
        this.router.navigateByUrl('/home');
      })
      .catch(error => {
        console.error('Regisztrációs hiba:', error);
        this.showForm = true;
        
        switch(error.code) {
          case 'auth/email-already-in-use':
            this.signupError = 'This email already in use.';
            break;
          case 'auth/invalid-email':
            this.signupError = 'Invalid email.';
            break;
          case 'auth/weak-password':
            this.signupError = 'The password is too weak. Use at least 6 characters.';
            break;
          default:
            this.signupError = 'An error has occurred during registration. Please try again later.';
        }
      });
  }
}
