import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {CategoryModel} from '../../shared/models/category.model';

@Component({
  selector: 'wfm-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent implements OnInit {

  @Output() filterCancel = new EventEmitter<any>();
  @Output() filterApply = new EventEmitter<any>();
  @Input() categories: CategoryModel [];

  timePeriods = [
    {
      type: 'd', label: 'Day'
    },
    {
      type: 'w', label: 'Week'
    },
    {
      type: 'M', label: 'Month'
    }
  ];

  types = [
    {type: 'INCOME', label: 'Income'},
    {type: 'OUTCOME', label: 'Outcome'}
  ];
  selectedPeriod = 'd';
  selectedTypes = [];
  selectedCategories = [];

  ngOnInit(): void {
  }

  closeFilter() {
    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.filterCancel.emit();
  }

  handleChangeType({checked, value}) {
    this.calculateParams('selectedTypes', checked, value);
  }

  private calculateParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(i => i !== value);
    }
  }

  handleChangeCategory({checked, value}) {
    this.calculateParams('selectedCategories', checked, value);
  }

  applyFilter() {
    this.filterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }
}
