import { Component, Input, OnDestroy, OnChanges, OnInit } from '@angular/core';
import { AuthDTO, AccountType, FreelancePrivateDTO} from '@neadz/dtos';
import { UserService, ProfileService} from '@app/core/services/';
import { MatDialog } from '@angular/material/dialog';
import { modalFactory } from 'src/app/shared/modal/modal.component';
import { Subject } from 'rxjs/internal/Subject';

// Components
import { MainProfileDataModalComponent } from '../../modal/main-profile-data-modal/main-profile-data-modal.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-contact',
  templateUrl: './profile-contact.component.html',
  styleUrls: ['./profile-contact.component.scss'],
})
export class ProfileContactComponent implements OnInit, OnDestroy, OnChanges {
  freelance: FreelancePrivateDTO;
  user: AuthDTO;
  accountType = AccountType;
  private componentDestroyed = new Subject();

  constructor(
    private userService: UserService,
    private profileService: ProfileService,
    private dialog: MatDialog,
    ) {}

  ngOnInit() {
    this.user = this.userService.getCurrentUser();
    this.freelance = <FreelancePrivateDTO>this.profileService.getCurrentFreelance();
    this.profileService.listen()
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res: FreelancePrivateDTO) => {
      this.freelance = res;
    });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  ngOnChanges() {
  }

  /**
   * Open modal to show freelance details
   */
  showDetails() {
    const modal = modalFactory<MainProfileDataModalComponent>(this.dialog);
    modal.open({}, MainProfileDataModalComponent, () => {
      this.freelance = <FreelancePrivateDTO>this.profileService.getCurrentFreelance();
    });
  }
}
