import {Component, Input, OnInit} from '@angular/core';
import {BillService} from '../../shared/services/bill.service';
import {BillModel} from '../../shared/models/bill.model';


@Component({
  selector: 'wfm-bill-card',
  templateUrl: './bill-card.component.html',
  styleUrls: ['./bill-card.component.scss']
})
export class BillCardComponent implements OnInit {
  @Input() bill: BillModel;
  @Input() currency: any;

  dollar: number;
  euro: number;

  constructor(private  billService: BillService) {
  }

  ngOnInit(): void {
    const {Valute} = this.currency;
    this.dollar = Valute[`USD`].Value * this.bill.value;
    this.euro = Valute[`EUR`].Value * this.bill.value;



  }


}
