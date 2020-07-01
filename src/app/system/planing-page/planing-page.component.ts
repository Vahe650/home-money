import {Component, OnDestroy, OnInit} from '@angular/core';
import {BillService} from '../shared/services/bill.service';
import {CategoryService} from '../shared/services/category.service';
import {EventService} from '../shared/services/event.service';
import {forkJoin, Subscription} from 'rxjs';
import {BillModel} from '../shared/models/bill.model';
import {CategoryModel} from '../shared/models/category.model';
import {EventModel} from '../shared/models/event.model';

@Component({
  selector: 'wfm-planing-page',
  templateUrl: './planing-page.component.html',
  styleUrls: ['./planing-page.component.scss']
})
export class PlaningPageComponent implements OnInit, OnDestroy {

  isLoaded = false;
  sub1: Subscription;
  bill: BillModel;
  categories: CategoryModel[];
  events: EventModel[];

  constructor(
    private billService: BillService,
    private categoryService: CategoryService,
    private eventService: EventService
  ) {
  }

  ngOnInit(): void {
    this.sub1 = forkJoin([this.billService.getBill(), this.categoryService.getCategories(), this.eventService.getEvents()])
      .subscribe((data: [BillModel, CategoryModel[], EventModel[]]) => {
        this.bill = data[0];
        this.categories = data[1][`_embedded`][`categories`];
        this.events = data[2][`_embedded`][`events`];
        this.isLoaded = true;
      });
  }

  getCategoryCost(category: CategoryModel): number {
    const catEvents = this.events.filter(e => e.category.categoryId === category.categoryId && e.eventType === 'OUTCOME');
    return catEvents.reduce((total, e) => {
      total += e.amount;
      return total;
    }, 0);
  }

  private getPercent(category: CategoryModel): number {
    const percent = (100 * this.getCategoryCost(category)) / category.capacity;
    return percent > 100 ? 100 : percent;
  }

  public getCategoryPercent(category: CategoryModel): string {
    return this.getPercent(category) + '%';
  }

  ngOnDestroy(): void {
    this.sub1.unsubscribe();
  }

  getCategoryColorClass(categ: CategoryModel): string {
    const percent = this.getPercent(categ);
    return percent < 60 ? 'success' : percent >= 100 ? 'danger' : 'warning';

  }
}
