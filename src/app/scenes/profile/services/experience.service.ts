import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/services/api.service';
import { CompanyPublicDTO, ExperienceDTO, ExperienceWithCompletion } from '@neadz/dtos';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

interface CompaniesDTO {
  data: CompanyPublicDTO[];
  total: number;
}

@Injectable()
export class ExperienceService {
  constructor(private http: ApiService) {
    this.http = http;
  }

  /**
   * Create a new Experience
   * @param {string} forFreelance freelance ID
   * @param {ExperienceDTO} experience
   * @return {Observable<ExperienceDTO[]>}
   */
  create(forFreelance: string, experience: ExperienceDTO): Observable<ExperienceWithCompletion> {
    return this.http.post<ExperienceWithCompletion>(`freelance/${forFreelance}/experience`, experience);
  }

  /**
   * Update an Experience
   * @param {ExperienceDTO} experience
   * @return {Observable<ExperienceDTO>}
   */
  update(experience: ExperienceDTO): Observable<ExperienceDTO> {
    return this.http.patch(`freelance/experience/${experience.id}`, experience);
  }

  /**
   * Delete an Experience
   * @param {string} experience ID
   * @return {Observable<ExperienceWithCompletion>}
   */
  delete(experience: string): Observable<ExperienceWithCompletion> {
    return this.http.delete<ExperienceWithCompletion>(`freelance/experience/${experience}`);
  }

  /**
   * Create a new Company
   * @param {CompanyPublicDTO} company
   * @return {Observable<FreelancePublicDTO>}
   */
  createCompany(company: CompanyPublicDTO): Observable<CompanyPublicDTO> {
    return this.http.post<CompanyPublicDTO>(`companies`, company);
  }

  /**
   * Search companies
   * @param {string} searchText
   * @return {Observable<CompanyPublicDTO[]>}
   */
  searchCompanies(searchText: string): Observable<CompanyPublicDTO[]> {
    const params = { 'name': searchText, 'active': -1};
    return this.http
    .get<CompaniesDTO>('companies', params)
    .pipe(map((res: CompaniesDTO) => res.data));
  }
}
