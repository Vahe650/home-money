import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {BillModel} from '../models/bill.model';
import {map} from 'rxjs/operators';
import {BaseApi} from '../../../shared/core/base.api';
import {EventModel} from '../models/event.model';

@Injectable()
export class EventService extends BaseApi {


  constructor(public http: HttpClient) {
    super(http);
  }


  getEvents(): Observable<EventModel []> {
    return this.get('events');
  }

  addEvent(event: EventModel): Observable<EventModel> {
    console.log(event);
    return this.post('events', event);
  }

  getEventById(id: string): Observable<EventModel> {
    return this.get(`events/${id}`);
  }

}
