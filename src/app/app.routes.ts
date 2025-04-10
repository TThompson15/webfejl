import { Routes } from '@angular/router';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { HomeComponent } from './pages/home/home.component';
import { ReportComponent } from './pages/report/report.component';
import { AuthGuard } from './guards/auth.guard';


export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  { path: 'login', component: LoginComponent, data: { animation: 'LoginPage' } },
  { path: 'register', component: RegisterComponent, data: { animation: 'RegisterPage' } },

  { path: 'home', component: HomeComponent, canActivate: [AuthGuard], data: { animation: 'HomePage' } },
  { path: 'report', component: ReportComponent, canActivate: [AuthGuard], data: { animation: 'ReportPage' } },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard], data: { animation: 'ProfilePage' } },

  { path: '**', redirectTo: 'home' }
];


