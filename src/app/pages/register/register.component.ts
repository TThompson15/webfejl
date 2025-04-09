import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  email = '';
  password = '';
  error: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  register() {
    this.authService.register(this.email, this.password)
      .then(() => {
        alert('Sikeres regisztráció!');
        this.router.navigate(['/profile']);
      })
      .catch(err => this.error = err.message);
  }
}
