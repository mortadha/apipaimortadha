import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {
  NeedDTO,
  AuthDTO,
  AccountType,
  CompanyPublicDTO,
  DurationTypeEnum,
  FreelanceNeedStatus,
  NeedSource,
  NeedAvailabilityTypeEnum,
} from '@neadz/dtos';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { UserService, NotificationType, NotificationService } from '@app/core/services';

import { modalFactory } from '@app/shared/modal/modal.component';
import { MatDialog } from '@angular/material';

// Services
import { CompanyService } from '@app/core/services/company.service';

// Components
import {
        CreateNeedModalComponent,
        CreateNeedModalData
      } from '../../../needs/modal/create-need-modal/create-need-modal.component';
import {
        AssignFreelanceModalComponent,
        AssignFreelanceModalData,
        } from '@app/scenes/agent/companies/modal/assign-freelance-modal/assign-freelance-modal.component';
import { NeedCompanyModalComponent } from '../../modal/need-company-modal.ts/need-company-modal.component';

@Component({
  selector: 'app-need-details',
  templateUrl: './need-details.component.html',
  styleUrls: ['./need-details.component.scss']
})
export class NeedDetailsComponent implements OnInit, OnDestroy {
  @Input() company: CompanyPublicDTO;
  private companyId: string;
  public need: NeedDTO;
  public description = '';
  private componentDestroyed = new Subject();
  public user: AuthDTO;
  public accountType = AccountType;
  public freelanceStatus = FreelanceNeedStatus;
  public durationType = DurationTypeEnum;
  public needSource = NeedSource;
  availabilityType = NeedAvailabilityTypeEnum;
  type: string;
  constructor(private activatedRoute: ActivatedRoute,
              private companyService: CompanyService,
              private dialog: MatDialog,
              private userService: UserService,
              private notification: NotificationService,
              private route: ActivatedRoute,
              private router: Router) {
    this.need = new NeedDTO();
    this.need.skills = [];
   }

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.activatedRoute.params.subscribe((params: Params) => {
      const needId = params['id'];
      this.companyService.getNeed(needId)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((response: NeedDTO) => {
        this.need = response;
        this.companyId = (this.user.type === AccountType.Company ? this.userService.getCompany().id : this.need.companyId);
        if (this.need.companyId === null && this.user.type === AccountType.Agent) {
          const modal = modalFactory<NeedCompanyModalComponent>(this.dialog);
          const data: NeedDTO = this.need;
          modal.open<NeedDTO>(data, NeedCompanyModalComponent, (result: NeedDTO) => {
            if (result !== undefined && result.companyId) {
              this.need = result;
              this.companyId = result.companyId;
              this.updateNeed();
            }
          });
        }
      });
    });

    this.route.queryParamMap.subscribe(queryParams => {
      this.type = queryParams.get('type');
    });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  /**
   * Callback edit the need
   */
  editNeed() {
    const modal = modalFactory<CreateNeedModalComponent>(this.dialog);
    const data: CreateNeedModalData = {
      companyId: this.companyId,
      need: this.need,
      isNew: false,
      editable: true
    };
    modal.open<CreateNeedModalData>(data, CreateNeedModalComponent, (result: NeedDTO | {'status': boolean, 'need': NeedDTO}) => {
      if (result && result.status === undefined) {
        this.need = result as NeedDTO;
      } else if ( result && result.status === false) {
          if (this.type) {
            if (this.type === 'besoins') {
              this.router.navigate(['agent/besoins']);
            } else if (this.type === 'entreprise') {
              this.router.navigate([`agent/entreprises/profile/${this.companyId}`]);
          }
          }
      }
    });
  }

  assignFreelance() {
    const data: AssignFreelanceModalData = {
      companyId: this.companyId,
      needId: this.need.id,
      freelances: this.need.freelanceNeeds.map((freeNeed) => freeNeed.freelance.id)
    };
    const modal = modalFactory<AssignFreelanceModalComponent>(this.dialog);
    modal.open(data, AssignFreelanceModalComponent, (res: NeedDTO) => {
      if (res) {
        const tmpTitle = this.need.companyTitle;
        const tmpCity = this.need.companyCity;
        this.need = res;
        this.need.companyCity = tmpCity;
        this.need.companyTitle = tmpTitle;
      }
    });
  }

  updateNeed() {
    this.companyService.updateNeed(this.need)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: NeedDTO) => {
      this.notification.show({
      title: 'Besoin',
      message: 'Le besoin a bien été mise à jour',
      type: NotificationType.success
    });
  }, (error) => {
      this.notification.show({
        title: 'Besoin',
        message: error,
        type: NotificationType.error
      });
    });
  }
}
