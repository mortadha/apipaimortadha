import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

// Components
import { FreelanceNeedStatus, CompanyNeedStatus, NeedDTO, NeedSource } from '@neadz/dtos';
import { Subject } from 'rxjs/internal/Subject';
import * as _moment from 'moment';
import { Router } from '@angular/router';
const moment = _moment;

@Component({
  selector: 'app-need',
  templateUrl: './need.component.html',
  styleUrls: ['./need.component.scss']
})
export class NeedComponent implements OnInit, OnDestroy {
  private componentDestroyed = new Subject();
  @Input() need: NeedDTO;
  isFullDescriptionDisplayed = false;
  createdDate = null;
  freelanceStatus = FreelanceNeedStatus;
  companyStatus = CompanyNeedStatus;
  needSource = NeedSource;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    ) {
    moment.locale('fr');
  }

  ngOnInit() {
    if (!this.need.skills) {
      this.need.skills = [];
    }

    if (this.need.jobTitle.length > 35) {
      this.need.jobTitle = this.need.jobTitle.substring(0, 35);
      this.need.jobTitle += '...';
    }
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  /**
   * Tell if Company has a profile picture
   */
  hasPicture(): boolean {
    return this.need.companyLogo &&
      this.need.companyLogo.url &&
      this.need.companyLogo.url.length > 0;
  }

  redirect() {
    this.router.navigate([`agent/besoins/${this.need.id}`], { queryParams: {'type': 'besoins'}});
  }
}
