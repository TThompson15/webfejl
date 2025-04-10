import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { NavbarComponent } from './shared/navbar/navbar.component';
import { SettingsService } from './services/settings.service';
/*
import { HomeComponent } from './pages/home/home.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { MenuComponent } from './shared/menu/menu.component';
import { ReportComponent } from './pages/report/report.component';
*/


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    const theme = this.settingsService.getSettings().theme;
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }
}

