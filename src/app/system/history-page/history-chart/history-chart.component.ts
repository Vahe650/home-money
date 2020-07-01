import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'wfm-history-chart',
  templateUrl: './history-chart.component.html',
  styleUrls: ['./history-chart.component.scss']
})
export class HistoryChartComponent implements OnInit {

  data = [
    {
      name: 'Germany',
      value: 8640000
    },
    {
      name: 'USA',
      value: 5000000
    },
    {
      name: 'France',
      value: 7200000
    },
  ];
  view: any [] = [545, 345];

  constructor() {
  }

  ngOnInit(): void {
  }

}
