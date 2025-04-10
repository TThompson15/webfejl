import { Injectable } from '@angular/core';
import { MeterLimit } from '../models/meter-limit.model';

@Injectable({ providedIn: 'root' })
export class LimitService {
  getLimitForUser(userId: string): Promise<MeterLimit> {
    return Promise.resolve({
      userId,
      minValue: 0,
      maxValue: 99999
    });
  }
}
