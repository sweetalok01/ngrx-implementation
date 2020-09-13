import { Action } from '@ngrx/store';
import { Event } from '../models/event';

export enum EventActionTypes {
  Add = '[Event] Add',
  EventAddSuccess = '[Event] Event Add Success',
  EventAddFailure = '[Event] Event Add Failure',
  Load = '[Event] Load',
  LoadSuccess = '[Event] Load Success',
  LoadFail = '[Event] Load Fail',
}

export class Add implements Action {
  readonly type = EventActionTypes.Add;

  constructor(public payload: Event) {}
}

export class EventAddSuccess implements Action {
  readonly type = EventActionTypes.EventAddSuccess;

  constructor(public payload: { event: Event }) {}
}

export class EventAddFailure implements Action {
  readonly type = EventActionTypes.EventAddFailure;

  constructor(public payload: any) {}
}

export class Load implements Action {
  readonly type = EventActionTypes.Load;
}

export class LoadSuccess implements Action {
  readonly type = EventActionTypes.LoadSuccess;

  constructor(public payload: Event[]) {}
}

export class LoadFail implements Action {
  readonly type = EventActionTypes.LoadFail;

  constructor(public payload: any) {}
}

export type EventActions =
  | Add
  | EventAddSuccess
  | EventAddFailure
  | Load
  | LoadSuccess
  | LoadFail;
