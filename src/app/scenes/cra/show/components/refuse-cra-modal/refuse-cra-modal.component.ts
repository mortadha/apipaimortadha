import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from '@app/core/services';

interface Data {
  refuseDescription: string;
  month: string;
  year: string;
  disabled: boolean;
}

@Component({
  selector: 'app-refuse-cra-modal',
  templateUrl: './refuse-cra-modal.component.html',
  styleUrls: ['./refuse-cra-modal.component.scss']
})
export class RefuseCraModalComponent implements OnInit {

  refuseDescription: string;
  form: FormGroup;
  submitted = false;

  constructor(
    public dialogRef: MatDialogRef<RefuseCraModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Data,
    public userService: UserService
  ) { }

  ngOnInit() {
    this.form = new FormGroup({
      'reasonRefuse': new FormControl({value: this.data.refuseDescription, disabled: this.data.disabled}, [
        Validators.required,
        Validators.min(1)
      ])
    });
  }

  get reasonForm() { return this.form.get('reasonRefuse'); }

  closeRefuse(validated: boolean) {
    this.submitted = true;
    if (validated === true && !this.reasonForm.errors) {
      this.dialogRef.close(this.reasonForm.value);
    } else if (validated === false) {
      this.dialogRef.close(null);
    }
  }
}
