import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { UserProfile } from '../../models/user-profile.model';
import { CapitalizePipe } from '../../pipes/capitalize.pipe';
import { TelFormatPipe } from '../../pipes/tel-format.pipe';
import { FormsModule } from '@angular/forms';

import { AddressAutocompleteComponent } from '../../components/address-autocomplete/address-autocomplete.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule, CapitalizePipe, TelFormatPipe, AddressAutocompleteComponent],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  user: UserProfile | null = null;
  editMode = false;
  saveMessage = '';
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private userService: UserService
  ) {
    this.authService.currentUser$.subscribe(user => {
      if (user) {
        this.userService.getUserProfile(user.uid).then(profile => {
          this.user = profile;
        });
      } else {
        this.user = null;
      }
    });
  }

  enableEdit() {
    this.editMode = true;
    this.saveMessage = '';
    this.errorMessage = '';
  }

  isPhoneValid(phone: string | undefined): boolean {
    return !!phone && /^(06|\+36)(20|30|70|31|50|1)\d{7}$/.test(phone);
  }

  saveChanges() {
    if (!this.user) return;

    if (!this.user.displayName || this.user.displayName.trim().length < 6) {
      this.errorMessage = 'A teljes név legalább 6 karakter hosszú legyen.';
      return;
    }

    if (!this.user.phone || !this.isPhoneValid(this.user.phone)) {
      this.errorMessage = 'A telefonszám formátuma hibás (pl. 06301234567).';
      return;
    }

    if (!this.user.address) {
      this.errorMessage = 'A lakcím megadása kötelező.';
      return;
    }

    this.userService.saveUserProfile(this.user).then(() => {
      this.editMode = false;
      this.saveMessage = 'Profil frissítve.';
      this.errorMessage = '';
    });
  }
}
