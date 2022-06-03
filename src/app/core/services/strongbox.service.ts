import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { ApiService } from '@app/core/services/api.service';
import { SecureTypeEnum, MediaDTO } from '@neadz/dtos';
import { map } from 'rxjs/operators';
import { HttpEvent, HttpEventType } from '@angular/common/http';

@Injectable()
export class StrongBoxService {
  constructor(private http: ApiService) {
    this.http = http;
  }

  /**
   * Get strongbox of a freelance as Ahent
   */
  getStrongboxAgent(idMission: string, idFreelance: string) {
    return this.http.get(`missions/${idMission}/strongbox/freelance/${idFreelance}`);
  }

  /**
   * Get strongbox of a company for a given mission
   */
  getCompanyStrongboxForMission(idMission: string) {
    return this.http.get(`missions/${idMission}/strongbox/company`);
  }

  /**
   * Upload file as a freelance
   */
  uploadFreelance(formData: FormData): Observable<MediaDTO[]> {
    return this.http.upload(`medias/strongbox/freelance`, formData);
  }

  /**
   * Upload file for a freelance
   */
  uploadForFreelance(forFreelance: string, formData: FormData) {
    return this.http.post(`medias/strongbox/freelance/${forFreelance}`, formData);
  }

  /**
   * Upload file for a mission
   * File accessible by everyone
   * If you are logged as agent
   */
  uploadForMission(mission: string, formData: FormData, type: SecureTypeEnum) {
    return this.http.post(`medias/strongbox/mission/${mission}/common?secureType=${type}`, formData);
  }

  /**
   * Upload file for a mission
   * File accessible by everyone
   * If you are logged as freelance
   */
  uploadForMissionFreelance(mission: string, formData: FormData, type: SecureTypeEnum): Observable<MediaDTO> {
    return this.http.post(`medias/strongbox/mission/${mission}/freelance?secureType=${type}`, formData);
  }

  /**
   * Get list private documents freelance for mission
   * @param {string} mission Mission id
   */
  getListMissionFreelanceDocuments(mission: string): Observable<MediaDTO[]> {
    return this.http.get(`missions/${mission}/strongbox/freelance`);
  }


  /**
   * Get list common documents for mission
   * @param {string} mission Mission id
   */
  getListMissionCompanyDocuments(mission: string): Observable<MediaDTO[]> {
    return this.http.get(`missions/${mission}/strongbox/company`);
  }

  uploadForMissionCompany(missionId: string, formData: FormData, type: SecureTypeEnum): Observable<MediaDTO> {
    return this.http.post(`medias/strongbox/mission/${missionId}/company?secureType=${type}`, formData);

  }
}
