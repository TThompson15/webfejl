import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

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

  constructor(private authService: AuthService) {}

  login() {
    this.authService.login(this.email, this.password)
      .then(() => {
        alert('Sikeres bejelentkezés!');
      })
      .catch(err => {
        this.error = err.message;
      });
  }
}
