import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Subject } from 'rxjs';
import { NotificationService, NotificationType, CompanyService, UserService } from '@app/core/services';
import { CompanyPrivateDTO, CompanyPublicDTO, NeedDTO, CompanyStatusEnum, AccountDTO } from '@neadz/dtos';
import { ExperienceService } from '@app/scenes/profile/services/experience.service';
import { takeUntil, flatMap } from 'rxjs/operators';

@Component({
  selector: 'app-need-company-modal',
  templateUrl: './need-company-modal.component.html',
  styleUrls: ['./need-company-modal.component.scss']
})
export class NeedCompanyModalComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();
  private searchText = ''; // text tmp for limiter
  currentText = ''; // CompanyName
  autocompleteCompanies: CompanyPublicDTO[] = [];
  noCompanies = false;
  autoCompFieldIsFocused: boolean;
  newCompanyCity = '';
  newCompanyCountry = '';
  isAddingNewCompany = false;
  submit =  false;

  constructor(public dialogRef: MatDialogRef<NeedCompanyModalComponent>,
              private notification: NotificationService,
              private experienceService: ExperienceService,
              private companyService: CompanyService,
              @Inject(MAT_DIALOG_DATA) public need: NeedDTO) {}

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close(this.need);
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  /**
   * Callback when user inputs name of the company
   */
  companyInputChange($event) {
    this.currentText = $event.target.value;
    if ($event.target.value.length === 0) {
      this.searchText = this.currentText = '';
      this.autocompleteCompanies = [];
      this.noCompanies = false;
      return ;
    }
    this.experienceService.searchCompanies($event.target.value)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res) => {
      this.searchText = $event.target.value;
      this.autocompleteCompanies = res;
      this.noCompanies = (this.autocompleteCompanies.length === 0 && this.autoCompFieldIsFocused);
    }, (error) => {
      this.notification.show({
        title: 'Recherche',
        message: error,
        type: NotificationType.error
      });
    });
  }

    /**
   * Callback when a user validates a new company
   */
  createNewCompany() {
    this.submit = true;
    const newCompany = new CompanyPublicDTO();
    newCompany.name = this.currentText;
    newCompany.city = this.newCompanyCity;
    newCompany.street = '';
    newCompany.zipcode = '';
    newCompany.code = 'UA' + this.currentText.substring(0, 2) + Math.floor((Math.random() * 10000) + 1);
    newCompany.country = this.newCompanyCountry;
    newCompany.status = CompanyStatusEnum.PROSPECT;

    this.experienceService.createCompany(newCompany)
    .pipe(takeUntil(this.componentDestroyed))
    .pipe(flatMap((res: CompanyPrivateDTO) => {
      this.need.companyCity = res.city;
      this.need.companyCountry = res.country;
      this.need.companyId = res.id;
      this.need.companyLogo = res.companyLogo;
      this.need.companyTitle = res.name;
      this.noCompanies = false;
      this.isAddingNewCompany = false;
      this.autocompleteCompanies = [];
      this.searchText = '';
      this.currentText = res.name;
      this.need.companyId = res.id;
      this.need.accountCompany.company = new CompanyPublicDTO();
      this.need.accountCompany.company.id = res.id;
      return this.companyService.updateClient(this.need.accountCompany);
    }))
    .subscribe((res: AccountDTO) => {}, (error) => {
      this.notification.show({
        title: 'Nouvelle entreprise',
        message: error,
        type: NotificationType.error
      });
    });
  }


    /**
   * Callback when a specific company is selected through autocomplete
   * @param {CompanyPublicDTO} company
   */
  selectCompany(company: CompanyPrivateDTO) {
    this.updateCompanyStatus(company);
    this.need.companyCity = company.city;
    this.need.companyCountry = company.country;
    this.need.companyId = company.id;
    this.need.companyLogo = company.companyLogo;
    this.need.companyTitle = company.name;
    this.autocompleteCompanies = [];
    this.searchText = '';
    this.currentText = company.name;
    this.noCompanies = false;
    this.submit = true;
  }

  updateCompanyStatus(company: CompanyPrivateDTO) {
    if (company.status === CompanyStatusEnum.INACTIVE) {
      company.status = CompanyStatusEnum.PROSPECT;
    }
    delete company.accounts;
    this.companyService.update(company)
    .pipe(takeUntil(this.componentDestroyed))
    .pipe(flatMap((res: CompanyPrivateDTO) => {
      this.need.accountCompany.company = company;
      return this.companyService.updateClient(this.need.accountCompany);
    }))
    .subscribe((res: AccountDTO) => {});
  }

  /**
   * Callback when a user wants to add a new company
   * @param {CompanyPublicDTO} company
   */
  addNewCompany() {
    this.autocompleteCompanies = [];
    this.noCompanies = true;
    this.isAddingNewCompany = true;
  }

  reset() {
    this.currentText = this.searchText = '';
    this.noCompanies = false;
    this.isAddingNewCompany = false;
  }
}
