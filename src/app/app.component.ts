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
import {
  trigger,
  transition,
  query,
  style,
  animate,
  group
} from '@angular/animations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* <=> *', [
        query(':enter, :leave', [
          style({
            position: 'absolute',
            width: '100%',
            top: 0,
            left: 0
          })
        ], { optional: true }),

        query(':enter', [
          style({ opacity: 0, transform: 'translateY(20px)' })
        ], { optional: true }),

        group([
          query(':leave', [
            animate('200ms ease-out', style({ opacity: 0, transform: 'translateY(-20px)' }))
          ], { optional: true }),
          query(':enter', [
            animate('300ms 100ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
          ], { optional: true })
        ])
      ])
    ])
  ]

})
export class AppComponent implements OnInit {
  constructor(private settingsService: SettingsService) {}

  ngOnInit(): void {
    const theme = this.settingsService.getSettings().theme;
    document.body.classList.toggle('dark-theme', theme === 'dark');
  }

  // Ez kell az animációhoz
  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] || '';
  }
}
