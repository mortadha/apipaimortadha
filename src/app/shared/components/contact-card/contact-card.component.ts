import { Component, OnInit, Input, ViewChild, Output, EventEmitter} from '@angular/core';
import { AccountDTO, CompanyPublicDTO } from '@neadz/dtos';
import { MatSelect } from '@angular/material/select';
import { modalFactory } from 'src/app/shared/modal/modal.component';

import { CreateContactModalComponent, CreateContactModalData } from '@app/shared/modal/create-contact-modal/create-contact-modal.component';
import { ConfirmDeleteModalComponent, ConfirmDeleteModalData } from '@app/shared/modal/confirm-delete-modal/confirm-delete-modal.component';

import { MatDialog } from '@angular/material/dialog';
import { CompanyService, NotificationService, NotificationType } from '@app/core/services';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-contact-card',
  templateUrl: './contact-card.component.html',
  styleUrls: ['./contact-card.component.scss']
})
export class ContactCardComponent implements OnInit {
  @Output() mustUpdateList = new EventEmitter();
  @ViewChild(MatSelect) freelanceSelector: MatSelect;
  @Input() account: AccountDTO;
  @Input() company: CompanyPublicDTO;
  isDropdownOpen = false;
  email = '';

  private componentDestroyed = new Subject();

  constructor(
    public dialog: MatDialog,
    private companyService: CompanyService,
    private notification: NotificationService) { }

  ngOnInit() {}

  openDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
    this.freelanceSelector.open();
  }
  edit() {
    const data: CreateContactModalData = {
      company: this.company,
      isNew: false,
      account: this.account
    };
    const modal = modalFactory<CreateContactModalComponent>(this.dialog);
    modal.open<CreateContactModalData>(data, CreateContactModalComponent, (result: AccountDTO) => {
      this.account = result;
    });
  }

  confirmDelete() {
    const modal = modalFactory<ConfirmDeleteModalComponent>(this.dialog);
    const data: ConfirmDeleteModalData = {
      action: 'delete'
    };
    modal.open<ConfirmDeleteModalData>(data, ConfirmDeleteModalComponent, (didValidate: boolean) => {
      if (didValidate === true) {
        this.delete();
      }
    });
  }

  delete() {
    this.companyService.deleteClient(this.account)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe(() => {
      this.mustUpdateList.emit(this.account.id);
      this.notification.show({
        title: 'Contact',
        message: 'Le contact a bien été supprimé',
        type: NotificationType.success
      });
    }, (error) => {
      this.notification.show({
        title: 'Contact',
        message: error,
        type: NotificationType.error
      });
    });
  }

    /**
   * Tell if contact has a profile picture
   */
  hasPicture(): boolean {
    return this.account.profilePicture && this.account.profilePicture.url.length > 0;
  }
}
