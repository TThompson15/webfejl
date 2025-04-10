import { Injectable } from '@angular/core';
import { AppSettings } from '../models/app-settings.model';

@Injectable({ providedIn: 'root' })
export class SettingsService {
  private readonly storageKey = 'app-settings';

  getSettings(): AppSettings {
    const raw = localStorage.getItem(this.storageKey);
    return raw ? JSON.parse(raw) : {
      notificationsEnabled: true,
      theme: 'light',
      language: 'hu'
    };
  }

  saveSettings(settings: AppSettings): void {
    localStorage.setItem(this.storageKey, JSON.stringify(settings));
  }
}
