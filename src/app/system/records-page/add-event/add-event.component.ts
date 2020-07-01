import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {CategoryModel} from '../../shared/models/category.model';
import {NgForm} from '@angular/forms';
import {EventModel} from '../../shared/models/event.model';
import * as moment from 'moment';
import {EventService} from '../../shared/services/event.service';
import {BillService} from '../../shared/services/bill.service';
import {mergeMap} from 'rxjs/operators';
import {pipe, Subscription} from 'rxjs';
import {CategoryService} from '../../shared/services/category.service';
import {BaseApi} from '../../../shared/core/base.api';
import {MessageModel} from '../../../shared/model/message.model';

@Component({
  selector: 'wfm-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {
  @Input() categories: CategoryModel [];
  types = [
    {type: 'INCOME', label: 'Income'},
    {type: 'OUTCOME', label: 'Outome'}
  ];
  message: MessageModel;
  sub1: Subscription;
  sub2: Subscription;
  sub3: Subscription;

  constructor(private eventService: EventService,
              private categoryService: CategoryService,
              private billService: BillService
  ) {
  }

  ngOnDestroy(): void {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
    if (this.sub2) {
      this.sub2.unsubscribe();
    }
    if (this.sub3) {
      this.sub3.unsubscribe();
    }
  }

  ngOnInit() {
    this.message = new MessageModel('danger', '');
  }

  private showMessage(text: string) {
    this.message.text = text;

  }

  public closeMessage() {
    this.message.text = '';
  }

  onSubmit(form: NgForm) {
    const {amount, description, category, eventType} = form.value;
    console.log(BaseApi.getUrl(`categories/${category}`));
    let event;
    this.categoryService.getCategory(category).subscribe((categ) => {
      event = new EventModel(eventType, amount, categ, moment()
        .format('DD.MM.YYYY HH:mm:ss'), description);
    });

    this.sub1 = this.billService.getBill().subscribe((bill) => {
      let value = 0;
      if (eventType === 'OUTCOME') {
        if (amount > bill.value) {
          this.showMessage(`Insufficient resources. you need ${amount - bill.value}`);
          return;
        } else {
          value = bill.value - amount;
        }

      } else {
        value = bill.value + amount;
      }
      this.sub2 = this.billService.updateBill({value, currency: bill.currency}).subscribe();
      this.sub3 = this.eventService.addEvent(event).subscribe(() => {
        form.setValue({
          amount: 0,
          description: ' ',
          category: 1,
          eventType: 'OUTCOME'
        });
        this.showMessage(`your bill is ${eventType === 'OUTCOME' ? bill.value - amount : amount + bill.value}`);
      });
    });
  }
}
