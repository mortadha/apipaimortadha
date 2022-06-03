import { Injectable } from '@angular/core';
import { ApiService } from '@app/core/services/api.service';
import { LanguageDTO } from '@neadz/dtos';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class LanguageService {
  constructor(private http: ApiService) {
    this.http = http;
  }

  /**
   * Create a new language
   * @param {string} forFreelance freelance ID
   * @param {LanguageDTO} language
   * @return {Observable<LanguageDTO[]>}
   */
  create(freelanceId: string, language: LanguageDTO): Observable<LanguageDTO> {
    return this.http.post<LanguageDTO>(`freelance/${freelanceId}/language`, language);
  }

  /**
   * Update a language
   * @param {LanguageDTO} Language
   * @return {Observable<LanguageDTO>}
   */
  update(language: LanguageDTO): Observable<LanguageDTO> {
    return this.http.patch(`freelance/language/${language.id}`, language);
  }

  /**
   * Delete a language
   * @param {string} language ID
   * @return {Observable<void>}
   */
  delete(languageId: string): Observable<void> {
    return this.http.delete<void>(`freelance/language/${languageId}`);
  }
}
