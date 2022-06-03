import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-stats-counter',
  templateUrl: './stats-counter.component.html',
  styleUrls: ['./stats-counter.component.scss']
})
export class StatsCounterComponent implements OnInit {
  @Input() stats: Array<object>;

  constructor() { }

  ngOnInit() {
  }
}
