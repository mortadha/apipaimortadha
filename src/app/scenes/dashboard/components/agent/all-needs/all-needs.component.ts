import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { NeedDTO, NeedAvailabilityTypeEnum } from '@neadz/dtos';
import { NeedService } from '@app/core/services';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-needs',
  templateUrl: './all-needs.component.html',
  styleUrls: ['./all-needs.component.scss']
})
export class AllNeedsComponent implements OnInit {

  private componentDestroy = new Subject();
  public needs: NeedDTO[];
  public total: number;
  public availabilityType = NeedAvailabilityTypeEnum;

  constructor(private needService: NeedService, private router: Router) { }

  ngOnInit() {
    this.fetchNeeds();
  }

  fetchNeeds() {
    this.needService.get({
      status: 0,
      take: 3,
      freelanceNeeds: 1
    })
    .pipe(takeUntil(this.componentDestroy))
    .subscribe((result) => {
      this.needs = result.data;
      this.total = result.total;
    });
  }

  redirect(id) {
    this.router.navigate([`agent/besoins/${id}`], { queryParams: {'type': 'besoins'}});
  }
}
