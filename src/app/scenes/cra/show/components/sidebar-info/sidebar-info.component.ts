import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  MissionDTO,
  SecureTypeEnum,
  CraDayDTO,
  CraDayType,
  NeedDTO,
  NeedStatusEnum,
  CraDTO,
  CraType,
  FreelanceNeedDTO,
  MediaDTO
} from '@neadz/dtos';
import { StrongBoxService, NotificationService, NotificationType, UserService } from '@app/core/services';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';
import { modalFactory } from '@app/shared/modal/modal.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { ShowCraInteractor } from '../../scene/show-cra.interactor';
import { SidebarDataSource, SidebarDataSourceBill, SidebarDataSourceCra } from './sidebar-dataSource.component';
import {
  MissionsFreelanceData,
  MissionDetailsModalComponent
} from '@app/scenes/freelance/missions/modal/mission-details-modal/mission-details-modal.component';
import {
  CreateNeedModalComponent,
  CreateNeedModalData
} from '@app/scenes/company/needs/modal/create-need-modal/create-need-modal.component';
import {
  ModifyDatesMissionModalComponent,
  ModifyDatesMissionModalData
} from '@app/scenes/cra/show/modal/modify-dates-mission-modal/modify-dates-mission-modal.component';

enum DataType {
  cra = 1,
  bill = 2,
}

interface DataObject {
  title: string;
  status: number;
  date: Date;
}

@Component({
  selector: 'app-sidebar-info',
  templateUrl: './sidebar-info.component.html',
  styleUrls: ['./sidebar-info.component.scss']
})
export class SidebarInfoComponent implements OnInit {
  mission: MissionDTO;
  cra: CraDTO;
  @Output() NeedRefreshNeeds: EventEmitter<NeedDTO> = new EventEmitter();
  @Output() documentTab = new EventEmitter<number>();
  dataType = DataType;
  tabbar = 1;
  craType = CraType;
  public dataSource: SidebarDataSource;
  dataArray: DataObject[];
  documentsFiles: MediaDTO[];
  private componentDestroyed = new Subject();
  downLoadCraIndex = 0;
  isNeedWon: boolean;

  constructor(
    public dialog: MatDialog,
    public userService: UserService,
    public strongBoxService: StrongBoxService,
    private notification: NotificationService,
    private router: Router,
    public interactor: ShowCraInteractor,
  ) { }

  ngOnInit() {
    this.mission = this.interactor.currentMission;
    this.cra = this.interactor.currentCra;
    this.isNeedWon = this.mission.need.status === NeedStatusEnum.WON ? true : false;
    this.displayData();
    if (this.userService.isFreelance()) {
      this.strongBoxService.getListMissionFreelanceDocuments(this.mission.id)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe((documents: MediaDTO[]) => {
          this.documentsFiles = documents;
        });
    } else if (this.userService.isAgent()) {
      this.strongBoxService.getStrongboxAgent(this.mission.id, this.mission.freelance.id)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe((documents: MediaDTO[]) => {
          this.documentsFiles = documents;
        });
    } else if (this.userService.isClient()) {
      this.strongBoxService.getCompanyStrongboxForMission(this.mission.id)
        .pipe(takeUntil(this.componentDestroyed))
        .subscribe((documents: MediaDTO[]) => {
          this.documentsFiles = documents;
        });
    }
  }

  redirectTo() {
    return `/agent/freelances/profile/${this.mission.freelance.id}`;
  }

  workingDays() {
    return this.interactor.currentCra.craDays.reduce((total: number, cra: CraDayDTO) => {
      if (cra.halfDay === true) {
        return total + 0.5;
      } else if (cra.status !== CraDayType.disabled &&
        cra.status !== CraDayType.enabled) {
        return total + 1;
      }
      return total;
    }, 0);
  }

  /**
   * Tell if Company has a profile picture
   */
  hasPictureCompany(): boolean {
    return this.mission.need.companyLogo &&
      this.mission.need.companyLogo.url &&
      this.mission.need.companyLogo.url.length > 0;
  }

  /**
   * Tell if Freelance has a profile picture
   */
  hasPictureFreelance(): boolean {
    return this.mission.freelance.account.profilePicture &&
      this.mission.freelance.account.profilePicture.url &&
      this.mission.freelance.account.profilePicture.url.length > 0;
  }

  /**
   * Upload file
   */
  fileUploaded(event) {
    const fileList: FileList = event.target['files'];
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const formData: FormData = new FormData();
      formData.append('file', file, file.name);

      if (this.userService.isFreelance()) {
        this.strongBoxService.uploadForMissionFreelance(this.mission.id, formData, SecureTypeEnum.Common)
          .pipe(takeUntil(this.componentDestroyed))
          .subscribe(data => { },
            (error) => {
              this.notification.show({
                title: 'Mise à jour de la mission',
                message: error,
                type: NotificationType.error
              });
            }
          );
      } else if (this.userService.isClient()) {
        this.strongBoxService.uploadForMissionCompany(this.mission.id, formData, SecureTypeEnum.Common)
          .pipe(takeUntil(this.componentDestroyed))
          .subscribe(data => { },
            (error) => {
              this.notification.show({
                title: 'Mise à jour de la mission',
                message: error,
                type: NotificationType.error
              });
            }
          );
      }
    }
  }

  changeDates() {
    if (this.userService.isAgent() === true) {
      const modal = modalFactory<ModifyDatesMissionModalComponent>(this.dialog);
      const data: ModifyDatesMissionModalData = {
        start: this.mission.start,
        end: this.mission.end,
        mission: this.mission
      };
      modal.open<ModifyDatesMissionModalData>(
        data,
        ModifyDatesMissionModalComponent,
        () => { });
    }
  }

  missionDetail() {
    if (this.userService.isFreelance() === true) {
      const emptyFreelanceNeedDTO = new FreelanceNeedDTO;
      const data: MissionsFreelanceData = {
        companyId: this.mission.need.companyId,
        freelanceNeed: emptyFreelanceNeedDTO,
        need: this.mission.need
      };
      const modal = modalFactory<MissionDetailsModalComponent>(this.dialog);
      modal.open(data, MissionDetailsModalComponent, (result: FreelanceNeedDTO) => {
      });
    } else if (this.userService.isAgent() === true) {
      const modal = modalFactory<CreateNeedModalComponent>(this.dialog);
      const data: CreateNeedModalData = {
        companyId: this.mission.need.companyId,
        need: this.mission.need,
        isNew: false,
        editable: true
      };
      modal.open<CreateNeedModalData>(data, CreateNeedModalComponent, (result: NeedDTO | { status: boolean, need: NeedDTO }) => { });
    }
  }

  allDocument() {
    this.documentTab.emit();
  }

  missionProfil() {
    if (this.userService.isAgent() === true) {
      this.router.navigate([`/agent/freelances/profile/${this.mission.freelance.id}`]);
    } else {
      this.router.navigate([`/entreprise/besoins/profile/${this.mission.freelanceNeed.id}`]);
    }
  }

  displayData() {
    if (this.tabbar === this.dataType.cra) {
      this.dataSource = new SidebarDataSourceCra(this.mission.cras);
      this.dataArray = this.dataSource.getData();
    } else {
      this.dataSource = new SidebarDataSourceBill();
    }
  }

  shortDataSource(): DataObject[] {
    if (this.dataArray.length > 3) {
      return this.dataArray.slice(0, 3);
    }
    return this.dataArray;
  }

  documentUrl(date: Date): string {
    if (this.documentsFiles) {
      for (let index = 0; index < this.dataArray.length; index++) {
        if ((this.documentsFiles[index].createDate + '').slice(5, 7) === (date + '').slice(5, 7)) { return this.documentsFiles[index].url; }
      }
    }
  }
}
