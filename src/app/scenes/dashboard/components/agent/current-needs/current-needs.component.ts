import { Component, OnInit } from '@angular/core';
import { NeedService } from '@app/core/services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { NeedDTO } from '@neadz/dtos/dist';

@Component({
  selector: 'app-current-needs',
  templateUrl: './current-needs.component.html',
  styleUrls: ['./current-needs.component.scss']
})
export class CurrentNeedsComponent implements OnInit {
  private componentDestroy = new Subject();
  params = {};
  needs: NeedDTO[];
  total: number;


  constructor(
    private needService: NeedService,
  ) { }

  ngOnInit() {
    this.fetchNeeds();
  }

  fetchNeeds() {
    this.needService.getLastThree(this.params)
    .pipe(takeUntil(this.componentDestroy))
    .subscribe((result) => {
      this.needs = result.data;
      this.total = result.total;
    });
  }
}
