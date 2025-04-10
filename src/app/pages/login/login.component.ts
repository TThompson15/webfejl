import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

import { Router } from '@angular/router';
import { ToastService } from '../../services/toast.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email = '';
  password = '';
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService
  ) {}
  
  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        this.toastService.show({
          type: 'success',
          message: 'Sikeres bejelentkezés!',
          timestamp: new Date()
        });
        this.router.navigate(['/profile']);
      })
      .catch(err => {
        this.error = err.message;
      });
  }
}
