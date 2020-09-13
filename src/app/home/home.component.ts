import { Component, OnInit } from '@angular/core';

import { Event } from '../models/event';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as event from '../actions/event.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public eventData = [];
  events: Observable<Event[]>;
  constructor(private store: Store<{ events: Event[] }>) {
    this.store.pipe(select('events')).subscribe((values: any) => {
      this.events = values.events;
    });
  }

  ngOnInit(): void {
    this.store.dispatch(new event.Load());
  }
}
