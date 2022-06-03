import { Component, OnInit } from '@angular/core';
import { BoardingNeedDTO } from '@neadz/dtos';
import { Router } from '@angular/router';
import { BoardingClientService } from '../../service/boarding.client.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-need-consort',
  templateUrl: './need-consort.component.html',
  styleUrls: ['./need-consort.component.scss']
})
export class NeedConsortComponent implements OnInit {
  boardingNeed: BoardingNeedDTO;
  form: FormGroup;
  submitted = false;
  link: string;
  consortMail = true;

  constructor(
    private boardingService: BoardingClientService,
    private router: Router) { }

  ngOnInit() {
    this.boardingNeed = this.boardingService.getCurrentBoardingNeed();
    this.link = this.boardingService.getLink();

    this.form = new FormGroup({
      'email': new FormControl(this.boardingNeed.email, [
        Validators.required
      ])
    });
  }
  get emailForm() { return this.form.get('email'); }

  /**
   * Create Need
   */
  submit() {
    this.submitted = true;
    if (this.checkInput()) {
      this.boardingNeed.email = this.form.value.email;
      this.router.navigate([this.link, { outlets: { etape: '5' } }]);
    }
  }

  checkInput() {
    if (this.emailForm.errors) {
      return false;
    } else {
      return true;
    }
  }
}
