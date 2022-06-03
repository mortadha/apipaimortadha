import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { takeUntil, map, flatMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, Params } from '@angular/router';

import { modalFactory } from '@app/shared/modal/modal.component';

import { NeedDTO, CompanyPublicDTO, MediaDTO } from '@neadz/dtos';

// Services
import { CompanyService, MediaService } from '@app/core/services/';

// Components
import {
  CreateNeedModalComponent,
  CreateNeedModalData
} from '@app/scenes/company/needs/modal/create-need-modal/create-need-modal.component';
import {
  CreateCompanyModalComponent,
  CreateCompanyModalData
} from '../../modal/create-company-modal/create-company-modal.component';

enum CompanyTabs {
  needs = 0,
  contrats = 1,
  bills = 2,
  contacts = 3
}

enum CompanyNeedTabs {
  open = 0,
  closed = 1
}

@Component({
  selector: 'app-company-profile',
  templateUrl: './company-profile.component.html',
  styleUrls: ['./company-profile.component.scss']
})
export class CompanyProfileComponent implements OnInit {
  @Output() emitter = new EventEmitter();
  companyAddress: string;
  company: CompanyPublicDTO;

  activeTab = CompanyTabs.needs;
  activeSubTab = CompanyNeedTabs.open;
  needs: NeedDTO[] = [];
  tabsType = CompanyTabs;
  subtabsType = CompanyNeedTabs;

  private componentDestroyed = new Subject();
  constructor(
    private dialog: MatDialog,
    private mediaService: MediaService,
    private companyService: CompanyService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params
      .pipe(
        map((params: Params) => {
          return params['id'];
        })
      )
      .pipe(flatMap(id => this.companyService.get(id)))
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((res: CompanyPublicDTO) => {
        this.company = res;
        this.formatAddress();
        this.needs = this.company.needs.filter(n => n.enabled === true);
      });
  }

  formatAddress() {
    this.companyAddress = this.company.street;
    if (this.company.city && this.company.city.length > 0) {
      this.companyAddress += `, ${this.company.city}`;
    }
  }

  ngOnInit() {}

  /**
   * Tell if Company has a profile picture
   */
  hasPicture(): boolean {
    return (
      this.company.companyLogo &&
      this.company.companyLogo.url &&
      this.company.companyLogo.url.length > 0
    );
  }

  loadNeeds() {
    const param = {
      enable: this.activeSubTab === CompanyNeedTabs.open ? 'true' : 'false'
    };
    this.companyService
      .getAllNeeds(this.company.id, param)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: NeedDTO[]) => {
        this.needs = result;
        this.company.needs = result;
      });
  }

  /**
   * Callback to edit a company
   */
  editCompany() {
    const modal = modalFactory<CreateCompanyModalComponent>(this.dialog);
    const data: CreateCompanyModalData = {
      company: this.company,
      isNew: false
    };
    modal.open<CreateCompanyModalData>(
      data,
      CreateCompanyModalComponent,
      (result: CompanyPublicDTO) => {
        if (result) {
          this.company = result;
          this.formatAddress();
          this.needs = this.needs = result.needs.filter(
            singleNeed => singleNeed.enabled !== false
          );
        }
      }
    );
  }

  /**
   * Callback create a need
   */
  createNeed() {
    const modal = modalFactory<CreateNeedModalComponent>(this.dialog);
    const need = new NeedDTO();
    const data: CreateNeedModalData = {
      companyId: this.company.id,
      need: need,
      isNew: true,
      editable: true
    };
    modal.open<CreateNeedModalData>(
      data,
      CreateNeedModalComponent,
      (result: NeedDTO[]) => {
        if (result) {
          if (this.activeSubTab === CompanyNeedTabs.open) {
            this.needs = result.filter(
              singleNeed => singleNeed.enabled !== false
            );
            this.company.needs = result;
          }
        }
      }
    );
  }

  /**
   * Start dragging
   * when user is selecting his working days
   */
  switchSubTab(tab: CompanyNeedTabs) {
    if (this.activeSubTab !== tab) {
      this.activeSubTab = tab;
      this.needs = [];
      this.loadNeeds();
    }
  }

  needUpdated() {
    this.needs = this.needs.filter(need => need.enabled !== false);
  }

  needSupp($event) {
    this.needs = this.needs.filter((need) => need.id !== $event);
  }

  updateList($event) {
    this.emitter.emit($event);
  }
}
