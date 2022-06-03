import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/operators';

import { modalFactory } from 'src/app/shared/modal/modal.component';
import { CreateContactModalComponent, CreateContactModalData} from '@app/shared/modal/create-contact-modal/create-contact-modal.component';


import { CompanyPrivateDTO, AccountDTO, AuthDTO, AccountType} from '@neadz/dtos';
import { CompanyService, UserService } from '@app/core/services/';

@Component({
  selector: 'app-company-contacts',
  templateUrl: './company-contacts.component.html',
  styleUrls: ['./company-contacts.component.scss']
})
export class CompanyContactsComponent implements OnInit, OnDestroy {
  @Input() company: CompanyPrivateDTO;

  private componentDestroyed = new Subject();
  user: AuthDTO;

  constructor(
    public dialog: MatDialog,
    private companyService: CompanyService,
    private userService: UserService) {}

  ngOnInit() {
    // If Company Type then we need to reload list of accounts
    if (this.userService.getCurrentUser().type === AccountType.Company) {
      this.fetchInformation();
    }
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  fetchInformation() {
    this.companyService
    .getContacts(this.company.id)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((contact: AccountDTO[]) => {
      this.company.accounts = contact;
    });
  }

  createContact() {
    const data: CreateContactModalData = {
      company: this.company,
      isNew: true,
      account: null,
    };
    const modal = modalFactory<CreateContactModalComponent>(this.dialog);
    modal.open<CreateContactModalData>(data, CreateContactModalComponent, (result: AccountDTO) => {
      if (result) {
        this.company.accounts.push(result);
      }
    });
  }

  updateList($event) {
    const tab = [];
    for (const account of this.company.accounts) {
      if (account.id !== $event) {
        tab.push(account);
      }
    }
    this.company.accounts = tab;
  }
}
