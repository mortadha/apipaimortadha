import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FreelancePrivateDTO, FreelancePublicDTO } from '@neadz/dtos';
import { ApiService } from './api.service';

interface FreelancesDTO {
  data: FreelancePublicDTO[];
  total: number;
}

@Injectable()
export class FreelanceService {

  private defaultStep = 20;
  private skip = 0;
  private take = this.defaultStep;

  constructor(private http: ApiService) {
    this.http = http;
  }

  /**
   * Freelance list all
   * Reset Skip value
   * @param params Freelance Params
   */
  getAll(params?: {}): Observable<FreelancesDTO> {
    this.skip = 0;
    params['skip'] = this.skip;
    params['take'] = this.take;
    return this.http.get<FreelancesDTO>('freelances', params)
      .pipe(map((res) => {
        return res;
      }));
  }

  getLastThree(params?: {}): Observable<FreelancesDTO> {
    this.skip = 0;
    params['take'] = 3;
    return this.http.get<FreelancesDTO>('freelances', params)
      .pipe(map((res) => {
        return res;
      }));
  }

  /**
   * Freelance list all get next page
   * @param params Freelance Params
   */
  getAllNext(params?: {}): Observable<FreelancePublicDTO[]> {
    this.skip += this.defaultStep;
    params['skip'] = this.skip;
    params['take'] = this.take;
    return this.http.get<FreelancesDTO>('freelances', params)
      .pipe(map((res) => {
        return res.data;
      }));
  }

  get(freelanceId: string): Observable<FreelancePublicDTO> {
    return this.http.get(`freelances/${freelanceId}`);
  }

  getPrivate(freelanceId: string): Observable<FreelancePrivateDTO> {
    return this.http.get(`freelances/${freelanceId}?private=true`);
  }

  getMe(): Observable<FreelancePrivateDTO> {
    return this.http.get(`freelances/me?private=true`);
  }

  /**
   * Patch Update Freelance
   * @param {FreelancePublicDTO} freelance
   * @return {Observable<FreelancePublicDTO>}
   */
  update(freelance: FreelancePublicDTO): Observable<FreelancePublicDTO> {
    return this.http.patch(`freelances/${freelance.id}`, freelance);
  }

  /**
   * Create Freelance
   * @param {FreelancePublicDTO} freelance
   * @return {Observable<FreelancePublicDTO>}
   */
  create(freelance: FreelancePublicDTO, tokenAgent?: string): Observable<FreelancePublicDTO> {
    return this.http.post<FreelancePublicDTO>(`freelances`, {'freelance': freelance, 'tokenAgent': tokenAgent});
  }

  /**
   * Download PDF profile
   * @param {string} freelanceId or FreelanceNeedId
   * @param {string} token
   * @param {string} fileName
   * @param {number} tjm specify another tjm to use for pdf generation
   * @param {boolean} proposal use when we are an agent and if we want to use freelanceNeed id or freelance id
   */
  downloadPdf(freelanceId: string, token: string, fileName: string, tjm?: number, proposal?: boolean) {
    return this.http.downloadFile(`pdf/profile/${freelanceId}`, token, fileName, tjm, proposal);
  }

  /**
   * Download PDF profile
   * @param {string} path
   * @param {string} token
   * @param {string} fileName
   */
  downloadBillPdf(path: string, token: string, fileName: string) {
    return this.http.downloadFile(`${path}`, token, fileName);
  }

  /**
   * Perform search on freelance db by name, firstname, skills
   * @param {string} searchText
   * @param {string} status
   */
  search(searchText: string, status: number) {
    return this.http.get(`freelances?firstname=${searchText}&status=${status}&lastname=${searchText}`);
  }

  /**
   * Return the statistics about freelances
   */
  getStats() {
    return this.http.get(`freelances/statistics`);
  }

  /**
   * Return the statistics for dashboard freelance
   */
  getDashboardStats() {
    return this.http.get(`freelances/dashboard/statistics`);
  }

  delete(freelanceId: string) {
    return this.http.delete(`freelances/${freelanceId}`);
  }

  resendMail(freelanceId: string) {
    return this.http.get(`accounts/resendMail/${freelanceId}`);
  }
}
