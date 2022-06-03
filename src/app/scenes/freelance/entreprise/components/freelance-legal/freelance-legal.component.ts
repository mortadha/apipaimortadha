import { Component, OnInit, OnDestroy } from '@angular/core';
import { StrongBoxService, MediaService, NotificationService, NotificationType } from '@app/core/services';
import { SecureTypeEnum, MediaDTO } from '@neadz/dtos';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';


interface DocFile {
  file?: File;
  status?: number;
  name: string;
}

enum FileType {
  socialCharge = 1,
  kbis = 2,
  insurance = 3,
}
// Components
@Component({
  selector: 'app-freelance-legal',
  templateUrl: './freelance-legal.component.html',
  styleUrls: ['./freelance-legal.component.scss']
})
export class FreelanceLegalComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();
  legalForm: FormGroup;
  secureType = SecureTypeEnum;
  socialChargePdf: boolean;
  kbisPdf: boolean;
  insurancePdf: boolean;
  validated = 0;
  fileType = FileType;
  socialIndex: number;
  kbisIndex: number;
  insuranceIndex: number;
  medias: MediaDTO[];
  constructor(
    private fb: FormBuilder,
    private strongBoxService: StrongBoxService,
    private mediaService: MediaService,
    private notification: NotificationService,
  ) {
    this.legalForm = this.fb.group({
      socialCharge: [''],
      kbis: [''],
      insurance: ['']
    });
  }

  ngOnInit() {
    const socialCharge: DocFile = { name: 'Charger votre attestation de vigilance ou preuve d\'immatriculation...' };
    const kbis: DocFile = { name: 'Charger votre Kbis' };
    const insurance: DocFile = { name: 'Charger votre attestation d\'assurance...' };
    this.mediaService.getMediaStrongbox().subscribe(result => {
      if (result) {
        for (let index = 0; index < result.length; index++) {
          if (result[index].type === SecureTypeEnum.SocialCharge) {
            socialCharge.name = result[index].fileName;
            this.socialChargePdf = this.checkFileType(socialCharge.name);
            this.socialIndex = index;
          }
          if (result[index].type === SecureTypeEnum.Kbis) {
            kbis.name = result[index].fileName;
            this.kbisPdf = this.checkFileType(kbis.name);
            this.kbisIndex = index;
          }
          if (result[index].type === SecureTypeEnum.Insurance) {
            insurance.name = result[index].fileName;
            this.insurancePdf = this.checkFileType(insurance.name);
            this.insuranceIndex = index;
          }
          this.medias = result;
        }
      }
    }, (error) => {
      console.log(error);
    }
    );
    this.legalForm.get('socialCharge').setValue(socialCharge);
    this.legalForm.get('kbis').setValue(kbis);
    this.legalForm.get('insurance').setValue(insurance);
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  onSelectedFile(event: { target: { [x: string]: FileList; }; }, type: SecureTypeEnum) {
    const fileList: FileList = event.target['files'];
    if (fileList.length > 0) {
      const file: File = fileList[0];
      let fileName = '';
      switch (type) {
        case SecureTypeEnum.SocialCharge:
          fileName = 'socialCharge';
          break;

        case SecureTypeEnum.Kbis:
          fileName = 'kbis';
          break;

        case SecureTypeEnum.Insurance:
          fileName = 'insurance';
          break;

        default:
          break;
      }
      const obj = this.legalForm.get(fileName).value;
      obj.file = file;
      obj.name = file.name;
      obj.status = 1;
      this.legalForm.get(fileName).setValue(obj);
    }
  }

  onSubmit() {
    const socialCharge = this.legalForm.get('socialCharge').value;
    const kbis = this.legalForm.get('kbis').value;
    const insurance = this.legalForm.get('insurance').value;
    const formData = new FormData();
    let changes = 0;
    if (socialCharge.status === 1) {
      formData.append('socialCharge', socialCharge.file);
      this.socialChargePdf = this.checkFileType(socialCharge.name);
      changes++;
      socialCharge.status = this.validated;
    }
    if (kbis.status === 1) {
      this.kbisPdf = this.checkFileType(kbis.name);
      formData.append('kbis', kbis.file);
      changes++;
      kbis.status = this.validated;
    }
    if (insurance.status === 1) {
      this.insurancePdf = this.checkFileType(insurance.name);
      formData.append('insurance', insurance.file);
      changes++;
      insurance.status = this.validated;
    }
    if (changes === 0) {
      return;
    }
    this.strongBoxService.uploadFreelance(formData)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe(
        data => {
          this.medias = data;
          this.notification.show({
            title: 'Documents mis à jour',
            message: 'Les documents ont bien été mises à jour',
            type: NotificationType.success
          });
        },
        (error) => {
          this.notification.show({
            title: 'Documents mis à jour',
            message: error,
            type: NotificationType.error
          });
        }
      );
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

  fileUrl(fileType: number) {
    switch (fileType) {
      case this.fileType.socialCharge:
        window.open(this.medias[this.socialIndex].url);
        break;
      case this.fileType.kbis:
        window.open(this.medias[this.kbisIndex].url);
        break;
      case this.fileType.insurance:
        window.open(this.medias[this.insuranceIndex].url);
        break;
    }
  }
}
