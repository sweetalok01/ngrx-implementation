import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import * as moment from 'moment';

import { select, Store } from '@ngrx/store';
import { Event } from '../models/event';
import { Observable } from 'rxjs';
import * as Events from '../actions/event.actions';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss'],
})
export class AddEventComponent implements OnInit {
  public form: FormGroup;
  public date;
  events: Observable<Event[]>;
  constructor(
    private store: Store<{ events: Event[] }>,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.events = store.pipe(select('events'));
  }

  @Output() submitted = new EventEmitter<Event>();

  ngOnInit(): void {
    this.form = this.fb.group({
      eventName: ['', Validators.required],
      address: ['', Validators.required],
      date: ['', Validators.required],
    });
  }

  onSubmit() {
    // console.log('save', this.form);
    if (this.form.valid) {
      const sendData = {
        eventName: this.form.value.eventName,
        address: this.form.value.address,
        date: this.date,
      };
      this.store.dispatch(new Events.Add(sendData));
    }
  }

  onchangeDate() {
    this.date = moment(this.form.value.date).format('D MMM');
  }
}
