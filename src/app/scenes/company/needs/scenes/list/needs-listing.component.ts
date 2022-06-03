import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

import { modalFactory } from 'src/app/shared/modal/modal.component';
import { NeedDTO, CompanyPublicDTO } from '@neadz/dtos';

// Services
import { CompanyService } from '@app/core/services/company.service';

// Components
import { CreateNeedModalComponent, CreateNeedModalData } from '../../modal/create-need-modal/create-need-modal.component';
import { UserService } from '@app/core/services';

enum NeedsListing {
  current = 1,
  ended = 2
}

@Component({
  selector: 'app-needs-listing',
  templateUrl: './needs-listing.component.html',
  styleUrls: ['./needs-listing.component.scss']
})
export class NeedsListingComponent implements OnInit, OnDestroy {
  activeTab = NeedsListing.current;
  tabs = NeedsListing;
  company: CompanyPublicDTO;
  needs: NeedDTO[];
  private componentDestroyed = new Subject();

  constructor(private dialog: MatDialog,
              private companyService: CompanyService,
              private userService: UserService) {
  }

  ngOnInit() {
    this.company = this.userService.getCompany();
    this.loadNeeds();
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
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
    modal.open<CreateNeedModalData>(data, CreateNeedModalComponent, (result: NeedDTO[]) => {
      this.company.needs = result;
      if (result !== undefined && this.activeTab === NeedsListing.current) {
        this.needs = result.filter(singleNeed => singleNeed.enabled);
      }
    });
  }

  /**
   * Load Needs
   */
  loadNeeds() {
    const param = {
      enable: (this.activeTab === NeedsListing.current ? 'true' : 'false')
    };
    this.companyService.getAllNeeds(this.company.id, param)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: NeedDTO[]) => {
      this.needs = result;
    });
  }

  /**
   * Start dragging
   * when user is selecting his working days
   */
  switchTab(tab: NeedsListing) {
    if (this.activeTab !== tab) {
      this.activeTab = tab;
      this.loadNeeds();
    }
  }
}
