import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, query, where, orderBy, limit, addDoc } from '@angular/fire/firestore';
import { AuthService } from './auth.service';
import { User } from 'firebase/auth';
import { Observable, of, switchMap, map } from 'rxjs';

export interface GasReading {
  id?: string;
  date: any;
  meterValue: number;
  userId?: string;
}

@Injectable({
  providedIn: 'root'
})
export class GasReadingService {
  readings$: Observable<GasReading[]>;

  constructor(
    private firestore: Firestore,
    private authService: AuthService
  ) {
    this.readings$ = this.authService.currentUser$.pipe(
      switchMap(user => {
        if (!user) return of([]);
        const readingsRef = collection(this.firestore, 'readings');
        const q = query(readingsRef, where('userId', '==', user.uid));
        return collectionData(q, { idField: 'id' }).pipe(
          map((docs: any[]) =>
            docs
              .map(doc => ({
                id: doc.id,
                date: new Date(doc.date?.seconds * 1000),
                meterValue: doc.meterValue,
                userId: doc.userId
              }))
              .sort((a, b) => a.meterValue - b.meterValue)
          )
        );
      })
    );
  }

  addReading(reading: GasReading) {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) return Promise.reject('Nincs bejelentkezett felhasználó.');

    const readingsRef = collection(this.firestore, 'readings');
    return addDoc(readingsRef, {
      ...reading,
      date: new Date(),
      userId: currentUser.uid
    });
  }

  getReadingsAbove(value: number): Observable<GasReading[]> {
    return this.authService.currentUser$.pipe(
      switchMap(user => {
        if (!user) return of([]);
        const readingsRef = collection(this.firestore, 'readings');
        const q = query(readingsRef,
          where('userId', '==', user.uid),
          where('meterValue', '>', value)
        );
        return collectionData(q, { idField: 'id' }) as Observable<GasReading[]>;
      })
    );
  }
  

  getLatestReadings(limitCount: number): Observable<GasReading[]> {
    return this.authService.currentUser$.pipe(
      switchMap(user => {
        if (!user) return of([]);
        const readingsRef = collection(this.firestore, 'readings');
        const q = query(readingsRef,
          where('userId', '==', user.uid),
          orderBy('date', 'desc'),
          limit(limitCount)
        );
        return collectionData(q, { idField: 'id' }) as Observable<GasReading[]>;
      })
    );
  }

  getReadingsThisMonth(): Observable<GasReading[]> {
    return this.authService.currentUser$.pipe(
      switchMap(user => {
        if (!user) return of([]);
        const readingsRef = collection(this.firestore, 'readings');
        const now = new Date();
        const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
        const startOfNextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  
        const q = query(
          readingsRef,
          where('userId', '==', user.uid),
          where('date', '>=', startOfMonth),
          where('date', '<', startOfNextMonth),
          orderBy('date', 'asc')
        );
  
        return collectionData(q, { idField: 'id' }) as Observable<GasReading[]>;
      })
    );
  }

  getLowestReadings(limitCount: number): Observable<GasReading[]> {
    return this.authService.currentUser$.pipe(
      switchMap(user => {
        if (!user) return of([]);
        const readingsRef = collection(this.firestore, 'readings');
        const q = query(
          readingsRef,
          where('userId', '==', user.uid),
          orderBy('meterValue', 'asc'),
          limit(limitCount)
        );
        return collectionData(q, { idField: 'id' }) as Observable<GasReading[]>;
      })
    );
  }
  
  
  
}
