import {Component, OnDestroy, OnInit} from '@angular/core';
import {CategoryService} from '../shared/services/category.service';
import {EventService} from '../shared/services/event.service';
import {forkJoin, Subscription} from 'rxjs';
import {BillModel} from '../shared/models/bill.model';
import {CategoryModel} from '../shared/models/category.model';
import {EventModel} from '../shared/models/event.model';
import * as moment from 'moment';

@Component({
  selector: 'wfm-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {
  subs: Subscription;
  categories: CategoryModel [];
  events: EventModel [];
  filteredEvents: EventModel [];
  isLoaded = false;
  isFilterVisible = false;


  constructor(private categoryService: CategoryService, private eventService: EventService) {
  }

  ngOnInit(): void {
    this.subs = forkJoin([this.categoryService.getCategories(), this.eventService.getEvents()])
      .subscribe((data: [CategoryModel[], EventModel[]]) => {
        this.categories = data[0][`_embedded`][`categories`];
        this.events = data[1][`_embedded`][`events`];
        this.setOriginalEvent();
        this.isLoaded = true;
      });
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  private toggleFilterVisibility(dir: boolean) {
    this.isFilterVisible = dir;

  }

  private setOriginalEvent() {
    this.filteredEvents = this.events.slice();

  }


  onFilterApply(filterData) {
    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');
    this.setOriginalEvent();
    this.toggleFilterVisibility(false);
    this.filteredEvents = this.filteredEvents.filter((e) => {
      return filterData.types.indexOf(e.eventType) !== -1;
    }).filter((e) => {
      return filterData.categories.indexOf(e.category[`categoryId`].toString()) !== -1;
    }).filter((e) => {
      const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
      return momentDate.isBetween(startPeriod, endPeriod);
    });

  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvent();
  }
}
