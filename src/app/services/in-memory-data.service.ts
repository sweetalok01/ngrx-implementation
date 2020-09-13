import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const events = [
      {
        id: 11,
        eventName: 'DevCon',
        address: 'Shankar Nagar, Raipur, Chhattisgarh, India',
        date: '30 Aug',
      },
    ];
    return { events };
  }
}
