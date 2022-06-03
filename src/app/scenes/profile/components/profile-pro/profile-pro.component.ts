import { Component, OnInit, Input } from '@angular/core';
import { AuthDTO, FreelancePublicDTO, FreelancePrivateDTO, CompanyStatusEnum, LegalStatusDTO, LegalStatusEnum } from '@neadz/dtos';
import { modalFactory } from '@app/shared/modal/modal.component';
import { ProfileService } from '@app/core/services';
import { MatDialog } from '@angular/material';
import { MainProfileProDataModalComponent } from '../../modal/main-profile-pro-data-modal/main-profile-pro-data-modal.component';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-profile-pro',
  templateUrl: './profile-pro.component.html',
  styleUrls: ['./profile-pro.component.scss']
})
export class ProfileProComponent implements OnInit {
  @Input() user: AuthDTO;
  freelance: FreelancePublicDTO;
  @Input() displaySeparator = false;
  statusEnum = LegalStatusEnum;
  private componentDestroyed = new Subject();

  constructor(private profileService: ProfileService, private dialog: MatDialog) {}

  ngOnInit() {
    this.freelance = this.profileService.getCurrentFreelance();
    this.profileService.listen()
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res: FreelancePrivateDTO) => {
      this.freelance = res;
    });
  }

  /**
   * Open modal to show freelance Pro details
   */
  showProDetails() {
    const modal = modalFactory<MainProfileProDataModalComponent>(this.dialog);
    modal.open({}, MainProfileProDataModalComponent, () => {
      this.freelance = <FreelancePrivateDTO>this.profileService.getCurrentFreelance();
    });
  }
}
