import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';
import {EventService} from '../../shared/services/event.service';
import {CategoryService} from '../../shared/services/category.service';
import {Subscription} from 'rxjs';
import {mergeMap} from 'rxjs/operators';
import {EventModel} from '../../shared/models/event.model';
import {CategoryModel} from '../../shared/models/category.model';

@Component({
  selector: 'wfm-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;
  eventModel: EventModel = new EventModel('xcvxcv', 8, new CategoryModel('', 0), 'asd', 'asdasd');
  isLoaded = false;
  className = {};

  constructor(private  route: ActivatedRoute,
              private eventService: EventService,
              private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.sub1 = this.route.params.subscribe((params) => {
      this.sub2 = this.eventService.getEventById(params[`id`]).subscribe((e) => {
        this.eventModel = e;
        this.isLoaded = true;
        this.className = {
          'card-success': this.eventModel.eventType === 'INCOME',
          'card-danger': this.eventModel.eventType === 'OUTCOME'
        };
      });
    });
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
    this.sub2.unsubscribe();
  }
}
