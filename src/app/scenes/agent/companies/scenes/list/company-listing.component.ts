import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { modalFactory } from '@app/shared/modal/modal.component';
import { Router } from '@angular/router';


import { CompanyPublicDTO, CompanyPrivateDTO, CompanyStatusEnum } from '@neadz/dtos';

// Components
import { CreateCompanyModalComponent, CreateCompanyModalData } from '../../modal/create-company-modal/create-company-modal.component';

// Services
import { CompanyService, CompaniesParams } from '@app/core/services/company.service';

enum CompanyTabs {
  prospect = CompanyStatusEnum.PROSPECT,
  client = CompanyStatusEnum.CLIENT
}

@Component({
  selector: 'app-company-listing',
  templateUrl: './company-listing.component.html',
  styleUrls: ['./company-listing.component.scss']
})

export class CompanyListingComponent implements OnInit, OnDestroy {
  companies: CompanyPublicDTO[] = [];
  searchText: string;
  tabsType = CompanyTabs;
  activeTab = CompanyTabs.client;
  private componentDestroyed = new Subject();
  private params: CompaniesParams;

  constructor(public dialog: MatDialog,
              private companyService: CompanyService,
              private router: Router) { }

  ngOnInit() {
    this.params = {
      active: CompanyStatusEnum.CLIENT,
    };
    this.fetchInformation();
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  fetchInformation() {
    this.companyService.getCompanies(this.params)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res) => {
      this.companies = res;
    });
  }

  /**
   * Called when user wants to change a tab
   * @param {CompanyTabs} tab
   */
  selectTab(tab: CompanyTabs) {
    if (tab !== this.activeTab) {
      this.activeTab = tab;
      this.params.active = this.activeTab;
      this.fetchInformation();
    }
  }

  /**
   * Called when user is typing some text
   */
  searchTextChanged() {
    this.params.name = this.searchText;
    this.companyService.search(this.params)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res) => {
      this.companies = res;
    });
  }


  /**
   * Called when user wants to create a new company
   */
  createNewCompany() {
    const data: CreateCompanyModalData = {
      company: new CompanyPrivateDTO(),
      isNew: true
    };
    const modal = modalFactory<CreateCompanyModalComponent>(this.dialog);
    modal.open<CreateCompanyModalData>(data, CreateCompanyModalComponent, (result: CompanyPublicDTO) => {
      if (result) {
        this.companies.push(result);
        this.router.navigateByUrl(`/agent/entreprises/profile/${result.id}`);
      }
    });
  }
}
