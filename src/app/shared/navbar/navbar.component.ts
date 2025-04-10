import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ToastService } from '../../services/toast.service';

import { SettingsService } from '../../services/settings.service';
import { AppSettings } from '../../models/app-settings.model';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    RouterModule
  ],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(
    private authService: AuthService,
    private router: Router,
    private toastService: ToastService,
    private settingsService: SettingsService
  ) {}

  get isLoggedIn(): boolean {
    return this.authService.getCurrentUser() !== null;
  }

  logout() {
    this.authService.logout().then(() => {
      this.toastService.show({
        type: 'success',
        message: 'Sikeresen kijelentkeztél!',
        timestamp: new Date()
      });
      this.router.navigate(['/login']);
    });
  }

  toggleTheme(): void {
    const current = this.settingsService.getSettings();
    const newTheme = current.theme === 'light' ? 'dark' : 'light';
    const updated: AppSettings = { ...current, theme: newTheme };

    this.settingsService.saveSettings(updated);

    // először eltávolítjuk a régi class-t, majd hozzáadjuk az újat
    document.body.classList.remove('dark-theme', 'light-theme');
    document.body.classList.add(`${newTheme}-theme`);
  }
}
