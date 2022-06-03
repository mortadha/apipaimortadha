import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil, map, flatMap } from 'rxjs/operators';
import {
  SignatureDTO,
} from '@neadz/dtos';
import { ActivatedRoute, Params } from '@angular/router';
import { MissionsService, UserService } from '@app/core/services/';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { environment } from '@env/environment';

@Component({
  selector: 'app-signature-mission',
  templateUrl: './signature.component.html',
  styleUrls: ['./signature.component.scss'],
})
export class SignatureComponent implements OnInit, OnDestroy {
  signatureUrl: SafeResourceUrl;
  private componentDestroyed = new Subject();

  constructor(
    private activatedRoute: ActivatedRoute,
    public missionService: MissionsService,
    public sanitizer: DomSanitizer,
    private userService: UserService,
  ) {
  }

  ngOnInit() {
    this.activatedRoute.params
    .pipe(map((params: Params) => params['id']))
    .pipe(flatMap((craId: string) => this.missionService.getSignature(craId)))
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((result: SignatureDTO) => {
      const userId = (this.userService.isFreelance() === true) ? result.memberFreelanceId : result.memberCompanyId;
      const url = `https://${environment.hostSE}/procedure/sign?members=${userId}&defaultLanguage=fr
        &signatureUi=/signature_uis/eca3112e-2dc3-4b8e-b1f1-388937e16790`;
        this.signatureUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);
      });
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }
}
