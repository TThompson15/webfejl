import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GasReadingService, GasReading } from '../../services/gas-reading.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Gázóra lejelentések</h2>
    <form (ngSubmit)="addReading()" #readingForm="ngForm">
      <input type="number" [(ngModel)]="newMeterValue" name="meterValue" placeholder="Óraállás" required />
      <button type="submit">Hozzáadás</button>
    </form>
    <div *ngIf="errorMessage" style="color: red;">{{ errorMessage }}</div>
    <ul>
      <li *ngFor="let reading of readings$ | async">
        Dátum: {{ reading.date | date:'short' }} - 
        Óraállás: {{ reading.meterValue }}
      </li>
    </ul>
  `
})
export class ReportComponent implements OnInit {
  readings$: Observable<GasReading[]>;
  newMeterValue!: number;
  errorMessage: string = '';
  lastMeterValue: number = 0;

  constructor(private gasReadingService: GasReadingService) {
    this.readings$ = this.gasReadingService.readings$;
  }

  ngOnInit(): void {
    this.gasReadingService.readings$.subscribe(readings => {
      if (readings.length > 0) {
        this.lastMeterValue = Math.max(...readings.map(r => r.meterValue));
      }
    });
  }

  addReading(): void {
    if (this.newMeterValue <= this.lastMeterValue) {
      this.errorMessage = `Az óraállás nem lehet kisebb vagy egyenlő az utolsó értéknél (${this.lastMeterValue}).`;
      return;
    }

    const newReading: GasReading = {
      meterValue: this.newMeterValue,
      date: new Date()
    };

    this.gasReadingService.addReading(newReading).then(() => {
      this.errorMessage = '';
      this.newMeterValue = 0;
      console.log('Adat sikeresen hozzáadva.');
    }).catch((error) => {
      console.error('Hiba az adat hozzáadásakor:', error);
      this.errorMessage = 'Hiba az adat hozzáadásakor.';
    });
  }
}
