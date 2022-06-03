import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/services/api.service';
import { CertificationDTO } from '@neadz/dtos';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class CertificationService {
  constructor(private http: ApiService) {
    this.http = http;
  }

  /**
   * Create a new certification
   * @param {string} forFreelance freelance ID
   * @param {CertificationDTO} certification
   * @return {Observable<CertificationDTO[]>}
   */
  create(freelanceId: string, certification: CertificationDTO): Observable<CertificationDTO> {
    return this.http.post<CertificationDTO>(`freelance/${freelanceId}/certification`, certification);
  }

  /**
   * Update a certification
   * @param {CertificationDTO} Certification
   * @return {Observable<CertificationDTO>}
   */
  update(certification: CertificationDTO): Observable<CertificationDTO> {
    return this.http.patch(`freelance/certification/${certification.id}`, certification);
  }

  /**
   * Delete a certification
   * @param {string} certification ID
   * @return {Observable<void>}
   */
  delete(certificationId: string): Observable<void> {
    return this.http.delete<void>(`freelance/certification/${certificationId}`);
  }
}
