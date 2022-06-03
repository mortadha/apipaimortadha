import { Injectable, EventEmitter } from '@angular/core';
import { FreelanceService } from './freelance.service';
import { FreelancePublicDTO, FreelancePrivateDTO } from '@neadz/dtos';
import { Observable } from 'rxjs/internal/Observable';
import { tap } from 'rxjs/internal/operators/tap';
import { Subject } from 'rxjs';

@Injectable()
export class ProfileService {
  private freelance: FreelancePublicDTO;
  private _listeners = new Subject();

  constructor(private freelanceService: FreelanceService) {
  }

  /**
   * Load current profile depending on param id of url
   * if no param id and the user role is freelance
   * we load his profile
   */
  load(freelanceId: string): Observable<FreelancePrivateDTO> {
    return this.freelanceService.getPrivate(freelanceId)
    .pipe(tap((result: FreelancePrivateDTO) => {
      this.freelance = result;
    }));
  }

  /**
   * Load current profile of logged the freelance
   */
  loadMe(): Observable<FreelancePublicDTO> {
    return this.freelanceService.getMe()
    .pipe(tap((result: FreelancePublicDTO) => {
      this.freelance = result;
    }));
  }

  /**
   * Get current freelance already loaded
   */
  getCurrentFreelance(): FreelancePublicDTO | FreelancePrivateDTO {
    return this.freelance;
  }

  /**
   * Update freelance information
   * @param {FreelancePublicDTO} freelance
   */
  setCurrentFreelance(freelance: FreelancePublicDTO) {
    this.freelance = freelance;
    this._listeners.next(freelance);
  }

  listen() {
    return this._listeners.asObservable();
  }
}
