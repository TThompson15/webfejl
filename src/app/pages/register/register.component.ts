import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

import { UserService } from '../../services/user.service';
import { UserProfile } from '../../models/user-profile.model';

import { updateProfile } from 'firebase/auth'; // EZT ADD HOZZÁ

import { ToastService } from '../../services/toast.service';

import { AddressAutocompleteComponent } from '../../components/address-autocomplete/address-autocomplete.component';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, AddressAutocompleteComponent],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  cities = ['Budapest', 'Debrecen', 'Szeged', 'Pécs', 'Miskolc'];

  email = '';
  password = '';
  displayName = '';
  address = '';      // ➕
  phone = '';        // ➕
  error: string | null = null;
  

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private toastService: ToastService
  ) {}
  
  isPasswordValid(pwd: string): boolean {
    return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+=\-{}[\]|:;"'<>,.?/]).{8,}$/.test(pwd);
  }
  
  isPhoneValid(phone: string): boolean {
    return /^(06|\+36)(20|30|70|31|50|1)\d{7}$/.test(phone);
  }

  register() {
  // 💡 MEZŐ VALIDÁLÁSOK
  if (this.displayName.length < 6) {
    this.error = 'A teljes név legalább 6 karakter hosszú legyen.';
    return;
  }

  if (!this.isPasswordValid(this.password)) {
    this.error = 'A jelszónak legalább 8 karakterből kell állnia, kis- és nagybetűt, számot, speciális karaktert is tartalmaznia kell.';
    return;
  }

  if (!this.isPhoneValid(this.phone)) {
    this.error = 'A telefonszámnak 06 vagy +36 kezdetűnek kell lennie, és pontosan 9 számjegyet kell követnie.';
    return;
  }

  if (!this.address) {
    this.error = 'Lakcím kiválasztása kötelező.';
    return;
  }

  // ✅ Ha minden mező érvényes, mehet a regisztráció
  this.authService.register(this.email, this.password)
    .then((userCredential) => {
      const user = userCredential.user;
      if (user) {
        return updateProfile(user, { displayName: this.displayName }).then(() => {
          const profile: UserProfile = {
            uid: user.uid,
            email: user.email ?? '',
            displayName: this.displayName,
            address: this.address,
            phone: this.phone,
            createdAt: new Date()
          };
          return this.userService.saveUserProfile(profile);
        });
      } else {
        return Promise.resolve();
      }
    })
    .then(() => {
      this.toastService.show({
        type: 'success',
        message: 'Sikeres regisztráció!',
        timestamp: new Date()
      });
      this.router.navigate(['/profile']);
    })
    .catch(err => {
      this.error = err.message;
    });
}

  
}
