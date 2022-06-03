import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService, MediaService } from '@app/core/services';
import { FreelancePrivateDTO, LegalStatusEnum, FreelanceBankDTO, SecureTypeEnum } from '@neadz/dtos';
import { pipe, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FreelanceBankService } from '@app/core/services/freelanceBank.service';

@Component({
  selector: 'app-info-entreprise',
  templateUrl: './info-entreprise.component.html',
  styleUrls: ['./info-entreprise.component.scss']
})
export class InfoEntrepriseComponent implements OnInit, OnDestroy {
  public freelance: FreelancePrivateDTO;
  public legalStatus: string;
  public kbisPdf = false;
  public insurancePdf = false;
  public socialChargePdf = false;
  public freelanceBank: FreelanceBankDTO;
  private componentDestroyed = new Subject();

  constructor(private userService: UserService, private mediaService: MediaService, private freelanceBankService: FreelanceBankService) {
    this.freelance = this.userService.getFreelance();
  }

  ngOnInit() {
    this.legalStatus = this.formatLegalStatus();
    this.freelanceBankService
    .get(this.freelance.id)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe(result => {
      if (result) {
        this.freelanceBank = result;
      }
    });
    this.mediaService.getMediaStrongbox()
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe(result => {
      if (result) {
        for (let index = 0; index < result.length; index++) {
          if (result[index].type ===  SecureTypeEnum.SocialCharge) {
            this.socialChargePdf = this.checkFileType(result[index].fileName);
          }
          if (result[index].type === SecureTypeEnum.Kbis) {
            this.kbisPdf = this.checkFileType(result[index].fileName);
          }
          if (result[index].type === SecureTypeEnum.Insurance) {
            this.insurancePdf = this.checkFileType(result[index].fileName);
          }
        }
      }
    }, (error) => {
      console.log(error);
    }
    );
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  formatLegalStatus(): string {
    let status = '';
    switch (this.freelance.legal.status) {
      case LegalStatusEnum['Auto-entreprise']:
        status = 'Auto-entreprise';
      break;

      case LegalStatusEnum['EI (entreprise individuelle)']:
        status = 'EI';
      break;

      case LegalStatusEnum.EIRL:
        status = 'EIRL';
      break;

      case LegalStatusEnum.EURL:
        status = 'EURL';
      break;

      case LegalStatusEnum.MDA:
        status = 'MDA';
      break;

      case LegalStatusEnum.SARL:
        status = 'SARL';
      break;

      case LegalStatusEnum['SAS/SASU']:
        status = 'SAS/SASU';
      break;
    }
    return status;
  }

  checkFileType(fileName: string): boolean {
    const fileType = fileName.substring(fileName.lastIndexOf('.') + 1);

    switch (fileType) {
      case 'pdf':
        return true;
      case 'jpeg':
        return true;
      case 'png':
        return true;
    }
    return false;
  }
}








