import { Injectable } from '@angular/core';
import { of, Observable, throwError } from 'rxjs';
import { Event } from '../models/event';
import {} from 'rxjs';

import {
  HttpClient,
  HttpParams,
  HttpErrorResponse,
} from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';

import { catchError } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    Authorization: 'my-auth-token',
  }),
};

@Injectable({
  providedIn: 'root',
})
export class EventService {
  eventsUrl = 'api/events';
  constructor(private http: HttpClient) {}

  add(event: Event): Observable<Event> {
    if (!event.eventName) {
      return throwError('Plese enter event name');
    } else if (!event.address) {
      return throwError('Plese enter address');
    } else if (!event.date) {
      return throwError('Plese enter date');
    } else {
      return this.http
        .post<Event>(this.eventsUrl, event, httpOptions)
        .pipe(catchError(this.handleError));
    }
  }

  getEvents(): Observable<Event[]> {
    return this.http
      .get<Event[]>(this.eventsUrl)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` + `body was: ${error.error}`
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }

  logout() {
    return of(true);
  }
}
