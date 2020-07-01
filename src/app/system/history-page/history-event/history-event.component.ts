import {Component, Input, OnInit} from '@angular/core';
import {CategoryModel} from '../../shared/models/category.model';
import {EventModel} from '../../shared/models/event.model';

@Component({
  selector: 'wfm-history-event',
  templateUrl: './history-event.component.html',
  styleUrls: ['./history-event.component.scss']
})
export class HistoryEventComponent implements OnInit {
  @Input() categories: CategoryModel [] = [];
  @Input() events: EventModel[] = [];
  searchValue = '';
  searchPlaceholder = 'Sum';
  searchField = 'amount';

  constructor() {
  }

  ngOnInit(): void {
    this.events.forEach((e) => {
      e.catName = this.categories.find(c => c.categoryId === e.category[`categoryId`]).name;
    });
  }

  getEventClass(e: EventModel) {
    return {
      label: true,
      'label-danger': e.eventType === 'OUTCOME',
      'label-success': e.eventType === 'INCOME'
    };

  }

  changeCriteria(field: string) {
    const namesMap = {
      amount: 'Sum',
      date: 'Date',
      catName: 'Category',
      eventType: 'Type'
    };
    this.searchPlaceholder = namesMap[field];
    this.searchField = field;


  }
}
