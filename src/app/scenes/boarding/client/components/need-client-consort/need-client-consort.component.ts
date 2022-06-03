import { Component, OnInit } from '@angular/core';
import { CompanyPublicDTO, CompanyStatusEnum, AccountDTO, NeedDTO, BoardingNeedDTO } from '@neadz/dtos';
import { Subject, Observable } from 'rxjs';
import { takeUntil, tap, mergeMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ValidateMailCustom } from '@app/shared/validator';
import { FormGroup, FormControl, Validators } from '@angular/forms';

// Services
import { BoardingClientService } from '../../service/boarding.client.service';
import { ExperienceService } from '@app/scenes/profile/services/experience.service';
import { NotificationService, NotificationType, CompanyService } from '@app/core/services';
@Component({
  selector: 'app-need-client-consort',
  templateUrl: './need-client-consort.component.html',
  styleUrls: ['./need-client-consort.component.scss']
})
export class NeedClientConsortComponent implements OnInit {
  public autocompleteCompanies: CompanyPublicDTO[] = [];
  public autoCompFieldIsFocused: boolean;
  public noCompanies = false;
  public isAddingNewCompany = false;
  public currentText = ''; // CompanyName
  private searchText = ''; // text tmp for limiter
  private componentDestroyed = new Subject();
  form: FormGroup;
  submitted = false;
  boardingNeed: BoardingNeedDTO;
  link: string;

  account: AccountDTO; // Current Account
  company: CompanyPublicDTO; // Current Company

  constructor(private boardingService: BoardingClientService,
    private companyService: CompanyService,
    private experienceService: ExperienceService,
    private notification: NotificationService,
    private router: Router) { }

  ngOnInit() {
    this.link = this.boardingService.getLink();
    this.boardingNeed = this.boardingService.getCurrentBoardingNeed();
    if (this.boardingNeed === undefined || null) {
      this.router.navigate([this.link]);
    }
    this.account = new AccountDTO();
    this.company = new CompanyPublicDTO;

    this.form = new FormGroup({
      'currentText': new FormControl(this.currentText),
      'lastName': new FormControl(this.account.lastName, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      'firstName': new FormControl(this.account.firstName, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      'title': new FormControl(this.account.title, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      'phone': new FormControl(this.account.phone, [
        Validators.required,
        Validators.maxLength(255),
      ]),
      'email': new FormControl(this.account.email, [
        Validators.required,
        Validators.maxLength(255),
        ValidateMailCustom,
        Validators.pattern(/^[^\W][a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\@[a-zA-Z0-9_]+(\.[a-zA-Z0-9_]+)*\.[a-zA-Z]{2,8}$/)
      ]),
      'street' : new FormControl(this.company.status, [
        Validators.required
      ]),
      'zipcode' : new FormControl(this.company.zipcode, [
        Validators.required
      ]),
      'city' : new FormControl(this.company.city, [
        Validators.required
      ]),
      'country' : new FormControl(this.company.country, [
        Validators.required
      ])
    });
  }

  get lastNameForm() { return this.form.get('lastName'); }
  get firstNameForm() { return this.form.get('firstName'); }
  get titleForm() { return this.form.get('title'); }
  get phoneForm() { return this.form.get('phone'); }
  get emailForm() { return this.form.get('email'); }
  // get companyNameForm() { return this.form.get('name'); }
  get companySteetForm() { return this.form.get('street'); }
  get companyZipcodeForm() { return this.form.get('zipcode'); }
  get companyCityForm() { return this.form.get('city'); }
  get companyCountryForm() { return this.form.get('country'); }

  /**
   * Callback when a specific company is selected through autocomplete
   * @param {CompanyPublicDTO} company
   */
  selectCompany(company: CompanyPublicDTO) {
    this.company = company;
    this.autocompleteCompanies = [];
    this.searchText = '';
    this.currentText = company.name;
    this.form.controls['currentText'].setValue(company.name);
    this.noCompanies = false;
  }

  /**
   * Callback when a user wants to add a new company
   * @param {CompanyPublicDTO} company
   */
  addNewCompany() {
    this.company = new CompanyPublicDTO();
    this.autocompleteCompanies = [];
    this.noCompanies = true;
    this.isAddingNewCompany = true;
  }

  reset() {
    this.currentText = this.searchText = '';
    this.noCompanies = false;
    this.isAddingNewCompany = false;
  }

  /**
   * Callback when a user validates a new company
   */
  createNewCompany(): Observable<CompanyPublicDTO> {

    if (this.company.name) {
      return Observable.of(this.company);
    }

    this.company.name = this.currentText;
    this.company.code = 'UA' + this.currentText.substring(0, 2) + Math.floor((Math.random() * 100) + 1);
    this.company.status = CompanyStatusEnum.PROSPECT;
    return this.experienceService.createCompany(this.company)
    .pipe(tap((company: CompanyPublicDTO) => {
      this.company = company;

      // this below is not really relevant
      return company;
    }));
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
    // Limiter, call api after 2 characters
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
   * Create Need
   */
  submit() {
    this.submitted = true;
    if (this.checkInput()) {
      this.account.lastName = this.form.value.lastName;
      this.account.firstName = this.form.value.firstName;
      this.account.title = this.form.value.title;
      this.account.phone = this.form.value.phone;
      this.account.email = this.form.value.email;

      this.company.street = this.form.value.zipcode;
      this.company.zipcode = this.form.value.zipcode;
      this.company.city = this.form.value.city;
      this.company.country = this.form.value.country;

      this.createNewCompany()
      .pipe(mergeMap((company: CompanyPublicDTO) => {
        const boardingNeed = this.boardingService.getCurrentBoardingNeed();
        boardingNeed.need.companyId = this.company.id;
        boardingNeed.account = this.account;
        return this.companyService.createBoardingNeed(boardingNeed);
      }))
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((_: NeedDTO) => {
          this.router.navigate(['/boarding/consort', { outlets: { etape: '6' } }]);
      }, (error) => {
        this.notification.show({
          title: 'Besoin',
          message: error,
          type: NotificationType.error
        });
      });
    }
  }

  checkInput() {
    if (this.lastNameForm.errors ||
      this.firstNameForm.errors ||
      this.titleForm.errors ||
      this.phoneForm.errors ||
      this.emailForm.errors) {
        return false;
      } else if ((this.companySteetForm.errors !== null && !this.company.street) ||
                (this.companyZipcodeForm.errors !== null && !this.company.zipcode) ||
                (this.companyCityForm.errors !== null && !this.company.city) ||
                (this.companyCountryForm.errors !== null  && !this.company.country) ) {
        return false;
        } else {
          return true;
        }
    }
}
