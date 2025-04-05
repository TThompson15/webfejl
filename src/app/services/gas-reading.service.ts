import { Injectable } from '@angular/core';
import { Firestore, collectionData, collection, addDoc } from '@angular/fire/firestore';
import { Observable, BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface GasReading {
  id?: string;
  date: any;
  meterValue: number;
}

@Injectable({
  providedIn: 'root'
})
export class GasReadingService {
  private readingsSubject = new BehaviorSubject<GasReading[]>([]);
  readings$ = this.readingsSubject.asObservable();

  constructor(private firestore: Firestore) {
    this.loadReadings();
  }

  loadReadings(): void {
    const readingsRef = collection(this.firestore, 'readings');
    collectionData(readingsRef, { idField: 'id' })
      .pipe(
        map((data: any[]) => 
          data
            .map(doc => ({
              id: doc.id,
              date: new Date(doc.date.seconds * 1000),
              meterValue: doc.meterValue
            }))
            .sort((a, b) => a.meterValue - b.meterValue)
        )
      )
      .subscribe((convertedData: GasReading[]) => {
        this.readingsSubject.next(convertedData);
      });
  }

  addReading(reading: GasReading) {
    const readingsRef = collection(this.firestore, 'readings');
    return addDoc(readingsRef, { 
      ...reading, 
      date: new Date()
    }).then(() => {
      this.loadReadings();
      console.log('Adat sikeresen hozzáadva.');
    }).catch((error) => {
      console.error('Hiba az adat hozzáadásakor:', error);
    });
  }
}
