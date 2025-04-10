import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AlertMessage } from '../models/alert-message.model';

@Injectable({ providedIn: 'root' })
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  show(message: AlertMessage) {
    this.snackBar.open(message.message, 'OK', {
      duration: 3000,
      panelClass: [`alert-${message.type}`]
    });
  }
}
