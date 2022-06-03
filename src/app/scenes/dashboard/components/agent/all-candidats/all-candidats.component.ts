import { Component, OnInit, OnDestroy } from '@angular/core';
import { FreelanceStatusEnum, FreelanceAvailabilityTypeEnum } from '@neadz/dtos';
import { FreelanceService } from '@app/core/services';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-all-candidats',
  templateUrl: './all-candidats.component.html',
  styleUrls: ['./all-candidats.component.scss']
})
export class AllCandidatsComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();
  private params = {
    order: 'lastnameASC',
    status: FreelanceStatusEnum.Registered,
  };
  public total = 0;
  public freelances = [];
  public availibilityType = FreelanceAvailabilityTypeEnum;

  constructor(private freelanceService: FreelanceService) { }

  ngOnInit() {
    this.freelanceService.getLastThree(this.params)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res) => {
      this.total = res.total;
      this.freelances = res.data;
    });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}
