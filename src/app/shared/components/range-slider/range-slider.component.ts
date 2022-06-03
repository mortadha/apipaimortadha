import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-range-slider',
  templateUrl: './range-slider.component.html',
  styleUrls: ['./range-slider.component.scss']
})

export class RangeSliderComponent implements OnInit {
  @Input() value: number;
  @Input() defaultValue: number;
  @Input() min = 0;
  @Input() max = 100;
  @Input() maxLabel = '';
  @Input() disabled = false;
  @Input() unit = '%';
  @Input() step = 1;
  @Input() ngModel: number;
  @Output() valueChanged = new EventEmitter();

  constructor() {
  }

  ngOnInit() {
    this.value = this.defaultValue;
  }

  updateValue(event) {
    this.value = event.from;
  }

  doneValue(event) {
    this.value = event.from;
    this.valueChanged.emit(this.value);
  }
}
