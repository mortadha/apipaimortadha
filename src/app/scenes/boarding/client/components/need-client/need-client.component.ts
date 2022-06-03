import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { emailValidator } from '@app/shared/validator';
import { NeedDTO, BoardingNeedDTO } from '@neadz/dtos';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

// Services
import { BoardingClientService } from '../../service/boarding.client.service';
import { NotificationService, NotificationType, CompanyService } from '@app/core/services/';

@Component({
  selector: 'app-need-client',
  templateUrl: './need-client.component.html',
  styleUrls: ['./need-client.component.scss']
})
export class NeedClientInfoComponent implements OnInit {
  public clientEmail = '';
  private boardingNeed: BoardingNeedDTO;
  form: FormGroup;
  submitted = false;
  link: string;
  yopmail = false;
  private componentDestroyed = new Subject();

  constructor(
    private companyService: CompanyService,
    private boardingService: BoardingClientService,
    public router: Router,
    private notification: NotificationService) { }

  ngOnInit() {
    this.link = this.boardingService.getLink();
    this.boardingNeed = this.boardingService.getCurrentBoardingNeed();
    if (this.boardingNeed === undefined || null) {
      this.router.navigate([this.link]);
    }

    this.form = new FormGroup({
      'email': new FormControl(this.clientEmail, [
            Validators.required,
            Validators.email
          ])
    });
  }

  checkInput() {
    if (!this.emailForm.errors) {
      if (emailValidator(this.form.get('email').value, true)) {
        this.yopmail = true;
        return false;
      } else {
        this.yopmail = false;
        return true;
      }
    } else {
      return false;
    }
  }

  get emailForm() { return this.form.get('email'); }


  next() {
    this.submitted = true;
    if (this.checkInput()) {
      this.boardingNeed.email = this.form.get('email').value;
      this.companyService.createBoardingNeed(this.boardingNeed)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((_: NeedDTO) => {
          this.router.navigate(['/boarding/entreprise', { outlets: { etape: '5' } }]);
        }, (error) => {
        this.notification.show({
          title: 'Besoin',
          message: error,
          type: NotificationType.error
        });
      });
    }
  }
}
