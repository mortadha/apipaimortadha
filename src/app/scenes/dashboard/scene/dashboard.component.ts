import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, FreelanceService } from '@app/core/services';
import { AccountType, AuthDTO, FreelancePrivateDTO, StatisticsDTO } from '@neadz/dtos';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';

@Component({
  selector: 'app-dashboard-company',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  public user: AuthDTO;
  public freelance: FreelancePrivateDTO;
  public accountType = AccountType;
  public stats = [];
  private componentDestroyed = new Subject();


  constructor(private userService: UserService, private freelanceService: FreelanceService) {
    this.user = this.userService.getCurrentUser();
    this.freelance = this.userService.getFreelance();
  }

  ngOnInit() {
    if (this.userService.isFreelance()) {
      this.freelanceService.getDashboardStats()
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((res: StatisticsDTO<number>) => {
        this.stats = [
          { title: 'Opportunités', value: res.opportunites },
        ];
      });
    } else if (this.userService.isAgent()) {

    }
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}
