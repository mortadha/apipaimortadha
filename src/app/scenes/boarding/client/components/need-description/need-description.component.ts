import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { BoardingClientService } from '../../service/boarding.client.service';
import { NeedDTO } from '@neadz/dtos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-need-description',
  templateUrl: './need-description.component.html',
  styleUrls: ['./need-description.component.scss']
})
export class NeedDescriptionComponent implements OnInit {
  public link: string;
  public isConsort: boolean;
  public need: NeedDTO;
  public descTextControl = new FormControl('');
  public descriptionLength: BehaviorSubject<number>;
  public title = 'Décrivez le projet proposé';
  form: FormGroup;
  submitted = false;

  constructor(
    private boardingService: BoardingClientService,
    private router: Router,
    ) { }

  ngOnInit() {
    this.need = this.boardingService.getCurrentNeed();
    this.link = this.boardingService.getLink();
    this.isConsort = this.boardingService.isConsort();
    if (!this.need.description) {
      this.need.description = '';
    }

    if (this.isConsort === false) {
      this.title += ' (optionnel)';
    }

    if (this.isConsort) {
      this.form = new FormGroup({
        'description': new FormControl(this.need.description, [
          Validators.required,
          Validators.minLength(10),
        ])
      });
    } else {
      this.form = new FormGroup({
        'description': new FormControl(this.need.description)
      });
    }
    this.descriptionLength = new BehaviorSubject(this.need.description.length);
    this.form.get('description').valueChanges.subscribe((v) => this.descriptionLength.next(v.length));
  }

  get descriptionForm() { return this.form.get('description'); }


  next() {
    this.submitted = true;
    if (this.checkInput()) {
      this.need.description = this.form.value.description;
      this.router.navigate([this.link, { outlets: { etape: '4' } }]);
    }
  }

  checkInput() {
    if (this.descriptionForm.errors) {
      return false;
    } else {
      return true;
    }
  }
}
