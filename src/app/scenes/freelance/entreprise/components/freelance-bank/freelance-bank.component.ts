import { Component, OnInit, OnDestroy } from '@angular/core';
import { FreelancePublicDTO, FreelancePrivateDTO, MediaDTO } from '@neadz/dtos';
import { FreelanceBankDTO } from '@neadz/dtos';
import { FreelanceBankService } from '@app/core/services/freelanceBank.service';
import { takeUntil, flatMap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { UserService, MediaService, NotificationService, NotificationType } from '@app/core/services';
// Components

@Component({
  selector: 'app-freelance-bank',
  templateUrl: './freelance-bank.component.html',
  styleUrls: ['./freelance-bank.component.scss']
})
export class FreelanceBankComponent implements OnInit, OnDestroy {

  freelance: FreelancePublicDTO;
  freelanceBank: FreelanceBankDTO;
  private componentDestroyed = new Subject();
  isNew = true;
  // tslint:disable-next-line: no-any
  rib: any;

  constructor(
    private freelanceBankService: FreelanceBankService,
    private userService: UserService,
    private mediaService: MediaService,
    private notification: NotificationService,
  ) {
  }

  ngOnInit() {
    this.freelance = <FreelancePrivateDTO>this.userService.getFreelance();
    this.freelanceBank = new FreelanceBankDTO;
    this.freelanceBankService
    .get(this.freelance.id)
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe(result => {
      if (result) {
        this.freelanceBank = result;
        this.isNew = false;
      }
    }, () => {
      console.log('error not found');
    });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  submit() {
    if (this.isNew === false) {
      if (this.rib) {
        this.fileUploaded(this.rib);
      } else {
        this.freelanceBankService.update(this.freelanceBank, this.freelance.id)
          .pipe(takeUntil(this.componentDestroyed))
          .subscribe(result => {
            this.onSuccess(result, this.isNew);
          });
      }
    } else {
      if (this.rib) {
        this.fileCreate(this.rib);
      } else {
        this.freelanceBankService.create(this.freelanceBank, this.freelance.id)
          .pipe(takeUntil(this.componentDestroyed))
          .subscribe(result => {
            this.onSuccess(result, false);
          });
      }
    }
  }

  onSuccess(result: FreelanceBankDTO, isNew: boolean) {
    this.freelanceBank = result;
    this.isNew = isNew;
    this.notification.show({
      title: 'Coordonnées mis à jour',
      message: 'Les coordonnées bancaires ont bien été mises à jour',
      type: NotificationType.success
    });
  }

  onError(error: string) {
    this.notification.show({
      title: 'Coordonnées mis à jour',
      message: error,
      type: NotificationType.error
    });
  }

  onFileChange(event) {
    this.freelanceBank.rib = new MediaDTO();
    this.rib = event.target.files[0];
    this.freelanceBank.rib.fileName = this.rib.name;
  }

  fileUploaded(file) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.mediaService
    .upload(formData)
    .pipe(takeUntil(this.componentDestroyed))
    .pipe(flatMap(data => {
      this.freelanceBank.rib.id = data['id'];
      this.freelanceBank.rib.url = data['url'];
      this.freelanceBank.rib.fileName = this.rib.name;
      return this.freelanceBankService.update(this.freelanceBank, this.freelance.id);
    }))
    .subscribe(result => {
      this.onSuccess(result, this.isNew);
    },
      this.onError
    );
  }

  fileCreate(file) {
    const formData: FormData = new FormData();
    formData.append('file', file, file.name);
    this.mediaService
    .upload(formData)
    .pipe(takeUntil(this.componentDestroyed))
    .pipe(flatMap(data => {
      this.freelanceBank.rib.id = data['id'];
      this.freelanceBank.rib.url = data['url'];
      this.freelanceBank.rib.fileName = this.rib.name;
      return this.freelanceBankService.create(this.freelanceBank, this.freelance.id);
    }))
    .subscribe(result => {
      this.onSuccess(result, false);
    },
      this.onError
    );
  }
}
