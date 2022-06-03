import { Component, OnInit, OnDestroy, Inject, Output, EventEmitter } from '@angular/core';
import { FreelancePublicDTO, FreelanceStatusEnum, FreelancePrivateDTO } from '@neadz/dtos';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NotificationService, NotificationType } from '@app/core/services/notification.service';

// Services
import { FreelanceService, CompanyService } from '@app/core/services/';

export interface AssignFreelanceModalData {
  companyId: string;
  needId: string;
  freelances: string[];
}
@Component({
  selector: 'app-assign-freelance-list',
  templateUrl: './assign-freelance-list.component.html',
  styleUrls: ['./assign-freelance-list.component.scss']
})
export class AssignFreelanceListComponent implements OnInit, OnDestroy {

  @Output() detailFreelance = new EventEmitter();

  freelances: FreelancePublicDTO[];
  private componentDestroyed = new Subject();

  params = {};
  previousText = '';
  total: number;
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<AssignFreelanceListComponent>,
              @Inject(MAT_DIALOG_DATA) private data: AssignFreelanceModalData,
              private companyService: CompanyService,
              private freelanceService: FreelanceService,
              private notification: NotificationService) {
    this.params = {
      'status': FreelanceStatusEnum.Confirmed,
      'needId': this.data.needId
    };
  }

  ngOnInit() {
    this.fetchInformation();
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  fetchInformation() {
    this.freelanceService.getAll(this.params)
    .subscribe((res) => {
      this.freelances = res.data;
      this.total = res.total;
    }, (error) => {
      this.notification.show({
        title: 'Reception des informations',
        message: error,
        type: NotificationType.error
      });
    });
  }

  onScroll() {
    if (this.freelances.length !== this.total && this.isLoading === false) {
      this.isLoading = true;
      this.freelanceService.getAllNext(this.params)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((res) => {
        this.isLoading = false;
          this.freelances = [...this.freelances,
                            ...res];
      });
    }
   }

  /**
   * Perform search on freelance db by name, firstname, skills
   */
  searchFreelance($event) {
    const text = $event.target.value;
    if (text.length === 0) {
      delete this.params['keywords'];
      this.previousText = '';
      this.fetchInformation();
      return ;
    }
    // Limiter, call api after 2 characters
    if (Math.abs(this.previousText.length - text.length) >= 2) {
      this.params['keywords'] = text;
      this.previousText = text;
      this.fetchInformation();
    }
  }

  freelanceDetail($event: FreelancePrivateDTO) {
    this.detailFreelance.emit($event);
  }
}
