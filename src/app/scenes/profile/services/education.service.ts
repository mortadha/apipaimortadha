import { Injectable } from '@angular/core';
import { UniversityDTO, EducationDTO, EducationWithCompletion } from '@neadz/dtos';
import { ApiService } from '@app/core/services/api.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

interface UniversitiesDTO {
  data: UniversityDTO[];
  total: number;
}

@Injectable()
export class EducationService {
  constructor(private http: ApiService) {
    this.http = http;
  }

  /**
   * Create a new Education
   * @param {string} forFreelance freelance ID
   * @param {EducationDTO} education
   * @return {Observable<EducationDTO[]>}
   */
  create(forFreelance: string, education: EducationDTO): Observable<EducationWithCompletion> {
    return this.http.post<EducationWithCompletion>(`freelance/${forFreelance}/education`, education);
  }

  /**
   * Get a specific Education
   * @param {string} forFreelance freelance ID
   * @param {string} education education ID
   * @return {Observable<EducationDTO>}
   */
  get(forFreelance: string, education: string): Observable<EducationDTO> {
    return this.http.get<EducationDTO>(`freelance/${forFreelance}/education/${education}`);
  }

  /**
   * Update an Education
   * @param {EducationDTO} education
   * @return {Observable<EducationDTO>}
   */
  update(education: EducationDTO): Observable<EducationDTO> {
    return this.http.patch(`freelance/education/${education.id}`, education);
  }

  /**
   * Delete an Education
   * @param {string} education ID
   * @return {Observable<EducationWithCompletion>}
   */
  delete(education: string): Observable<EducationWithCompletion> {
    return this.http.delete<EducationWithCompletion>(`freelance/education/${education}`);
  }

  /**
   * Create a new University
   * @param {UniversityDTO} university
   * @return {Observable<FreelancePublicDTO>}
   */
  createUniversity(university: UniversityDTO): Observable<UniversityDTO> {
    return this.http.post<UniversityDTO>(`universities`, university);
  }

  /**
   * Search university
   * @param {string} searchText
   * @return {Observable<UniversityDTO[]>}
   */
  searchUniversities(searchText: string): Observable<UniversityDTO[]> {
    const params = { 'name': searchText };
    return this.http.get<UniversitiesDTO>('universities', params).pipe(
      map((res: UniversitiesDTO) => {
        return res.data;
      }),
    );
  }
}
