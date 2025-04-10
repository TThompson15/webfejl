import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GasReadingService, GasReading } from '../../services/gas-reading.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LimitService } from '../../services/limit.service';
import { AuthService } from '../../services/auth.service';
import { ToastService } from '../../services/toast.service';
import { MaterialModule } from '../../shared/material/material.module';

@Component({
  selector: 'app-report',
  standalone: true,
  imports: [CommonModule, FormsModule, MaterialModule],
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})

export class ReportComponent implements OnInit {
  readings$: Observable<GasReading[]>;
  newMeterValue!: number;
  errorMessage: string = '';
  lastMeterValue: number = 0;

  constructor(
    private gasReadingService: GasReadingService,
    private authService: AuthService,
    private limitService: LimitService,
    private toastService: ToastService
  ) {
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

    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      this.errorMessage = 'Nincs bejelentkezett felhasználó.';
      return;
    }

    this.limitService.getLimitForUser(currentUser.uid).then(limit => {
      if (this.newMeterValue < limit.minValue || this.newMeterValue > limit.maxValue) {
        this.errorMessage = `Az óraállásnak ${limit.minValue} és ${limit.maxValue} között kell lennie.`;
        return;
      }

      const newReading: GasReading = {
        meterValue: this.newMeterValue,
        date: new Date()
      };

      this.gasReadingService.addReading(newReading).then(() => {
        this.errorMessage = '';
        this.newMeterValue = 0;

        this.toastService.show({
          type: 'success',
          message: 'Diktálás sikeres!',
          timestamp: new Date()
        });

      }).catch((error) => {
        console.error('Hiba az adat hozzáadásakor:', error);
        this.errorMessage = 'Hiba az adat hozzáadásakor.';
      });
    });
  }

}
