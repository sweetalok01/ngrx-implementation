import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { tap, map, exhaustMap, catchError, mergeMap } from 'rxjs/operators';

import { EventService } from '../services/event.service';
import {
  Add,
  EventAddSuccess,
  EventAddFailure,
  EventActionTypes,
  Load,
  LoadSuccess,
  LoadFail,
} from '../actions/event.actions';
import { Event } from '../models/event';

@Injectable()
export class EventEffects {
  @Effect()
  add$ = this.actions$.pipe(
    ofType(EventActionTypes.Add),
    map((action: Add) => action.payload),
    exhaustMap((event: Event) =>
      this.eventService.add(event).pipe(
        map((response: Event) => new EventAddSuccess({ event: response })),
        catchError((error) => of(new EventAddFailure(error)))
      )
    )
  );

  @Effect()
  loadLocation$ = this.actions$.pipe(
    ofType<Load>(EventActionTypes.Load),
    mergeMap((action) =>
      this.eventService.getEvents().pipe(
        map((events: Event[]) => new LoadSuccess(events)),
        catchError((errorMessage) => of(new LoadFail(errorMessage)))
      )
    )
  );

  @Effect({ dispatch: false })
  eventAddSuccess$ = this.actions$.pipe(
    ofType(EventActionTypes.EventAddSuccess),
    tap(() => this.router.navigate(['/home']))
  );

  constructor(
    private actions$: Actions,
    private eventService: EventService,
    private router: Router
  ) {}
}
