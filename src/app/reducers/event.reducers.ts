import { EventActions, EventActionTypes } from '../actions/event.actions';

import { Event } from '../models/event';

export interface State {
  events: Event[];
}

export const initialState: State = {
  events: [],
};

export function EventReducer(state = initialState, action: EventActions) {
  switch (action.type) {
    default:
      return state;
    case EventActionTypes.EventAddSuccess: {
      return {
        ...state,
        events: [...state.events, action.payload.event],
      };
    }
    case EventActionTypes.LoadSuccess: {
      return {
        ...state,
        events: action.payload,
      };
    }
  }
}
