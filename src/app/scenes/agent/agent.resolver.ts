import { Injectable } from '@angular/core';
import { ProfileService } from '@app/core/services/';

import { Resolve, Router, ActivatedRouteSnapshot } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import { FreelancePublicDTO, FreelancePrivateDTO } from '@neadz/dtos';

@Injectable()
export class AgentResolver implements Resolve<String | FreelancePublicDTO> {
  constructor(
    private profilService: ProfileService,
    private router: Router
  ) {}

  resolve(route: ActivatedRouteSnapshot): Observable<String | FreelancePrivateDTO> {
    const freelanceId = route.params['id'];
    return this.profilService.load(freelanceId).catch(error => {
      console.error(error);
      this.router.navigate(['404']);
      return Observable.of('data is not available');
    });
  }
}
