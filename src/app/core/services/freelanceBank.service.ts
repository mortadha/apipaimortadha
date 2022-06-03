import { FreelanceBankDTO } from '@neadz/dtos';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable()
export class FreelanceBankService {
  constructor(private http: ApiService) {
    this.http = http;
  }

  create(freelanceBank: FreelanceBankDTO, freelanceId: string): Observable<FreelanceBankDTO> {
    return this.http.post(`freelance/${freelanceId}/freelanceBank`, freelanceBank);
  }

  update(freelanceBank: FreelanceBankDTO, freelanceId: string): Observable<FreelanceBankDTO> {
    return this.http.patch(`freelance/${freelanceId}/freelanceBank`, freelanceBank);
  }

  get(freelanceId: string): Observable<FreelanceBankDTO> {
    return this.http.get(`freelance/${freelanceId}/freelanceBank`);
  }
}
