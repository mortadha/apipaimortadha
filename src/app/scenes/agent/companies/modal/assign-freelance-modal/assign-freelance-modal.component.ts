import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FreelancePublicDTO, NeedDTO, FreelancePrivateDTO, FreelanceStatusEnum, AccountDTO } from '@neadz/dtos';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';



// Services
import { FreelanceService, CompanyService, UserService } from '@app/core/services/';
import { NotificationService, NotificationType } from '@app/core/services/notification.service';

export interface AssignFreelanceModalData {
  companyId: string;
  needId: string;
  freelances: string[];
}
@Component({
  selector: 'app-assign-freelance-modal',
  templateUrl: './assign-freelance-modal.component.html',
  styleUrls: ['./assign-freelance-modal.component.scss']
})
export class AssignFreelanceModalComponent implements OnInit, OnDestroy {
  freelances: FreelancePublicDTO[];
  freelanceToAssign: string;
  private componentDestroyed = new Subject();
  freelance: FreelancePrivateDTO;

  params = {};
  previousText = '';
  detail = false;
  total: number;
  isLoading = false;

  constructor(public dialogRef: MatDialogRef<AssignFreelanceModalComponent>,
              @Inject(MAT_DIALOG_DATA) private data: AssignFreelanceModalData,
              private companyService: CompanyService,
              private freelanceService: FreelanceService,
              private notification: NotificationService,
              private userService: UserService) {
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


   submit($event) {
    //  if (this.data.freelances.length >= 3) {
    if (this.data.freelances.length >= 9000) {
      this.notification.show({
        title: 'Assignation',
        message: 'Maximum trois freelances / besoins simultanément',
        type: NotificationType.error
      });
     } else {
       this.companyService.assignFreelanceToNeed(this.data.companyId, this.data.needId, $event.freelanceId, $event.tjm)
       .pipe(takeUntil(this.componentDestroyed))
       .subscribe((res: NeedDTO) => {
         this.notification.show({
           title: 'Assignation',
           message: 'Le freelance a bien été assigné au besoin',
           type: NotificationType.success
         });
         this.dialogRef.close(res);
       });
     }
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
      return;
    }
    // Limiter, call api after 2 characters
    if (Math.abs(this.previousText.length - text.length) >= 2) {
      this.params['keywords'] = text;
      this.previousText = text;
      this.fetchInformation();
    }
  }

  detailFreelance($event: FreelancePrivateDTO) {
    this.detail = true;
    this.freelance = $event;
  }

  back() {
    this.detail = false;
  }
}
