import { Injectable } from '@angular/core';
import { CompanyPublicDTO, CompanyPrivateDTO, BoardingNeedDTO, NeedDTO, AccountDTO, MissionDTO } from '@neadz/dtos';
import { ApiService } from './api.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Missions } from './missions.service';

interface CompaniesDTO {
  data: CompanyPublicDTO[];
  total: number;
}

interface MissionsDTO {
  data: MissionDTO[];
  total: number;
}

export class Needs {
  data: NeedDTO[];
  total: number;
}

export interface CompaniesParams {
  active: number;
  name?: string;
  skip?: number;
  order?: number;
  take?: number;
}

@Injectable()
export class CompanyService {
  constructor(private http: ApiService) {
    this.http = http;
  }

  /**
   * GET a specific company
   * @param companyId
   */
  get(companyId: string): Observable<CompanyPrivateDTO> {
    return this.http.get<CompanyPrivateDTO>(`companies/${companyId}`)
      .pipe(map((res) => {
        return res;
      }));
  }

  /**
   * GET current connected company
   */
  getMe(): Observable<CompanyPrivateDTO> {
    return this.http.get<CompanyPrivateDTO>(`companies/me`)
      .pipe(map((res) => {
        return res;
      }));
  }

  /**
   * GET mission of specific company
   */
  getMissions(companyId: string, paramsMission?: {}): Observable<MissionsDTO> {
    return this.http.get<MissionsDTO>(`missions/company/${companyId}`, paramsMission)
      .pipe(map((res) => {
        return res;
      }));
  }

  /**
   * Create Company
   * @param {CompanyPublicDTO} company
   * @return {Observable<CompanyPublicDTO>}
   */
  create(company: CompanyPublicDTO): Observable<CompanyPublicDTO> {
    return this.http.post<CompanyPublicDTO>(`companies`, company);
  }

  /**
   * Update Company
   * @param {CompanyPublicDTO} company
   * @return {Observable<CompanyPublicDTO>}
   */
  update(company: CompanyPublicDTO): Observable<CompanyPublicDTO> {
    return this.http.patch<CompanyPublicDTO>(`companies/${company.id}`, company);
  }

  /**
   * Create Client Account for Company
   */
  createClient(client: AccountDTO): Observable<AccountDTO> {
    return this.http.post<AccountDTO>('accounts/client', client);
  }

  /**
   * Update a specific client account for a company
   */
  updateClient(client: AccountDTO): Observable<AccountDTO> {
    return this.http.patch<AccountDTO>(`accounts/${client.id}`, client);
  }

  /**
   * Delete a specific client account for a company
   */
  deleteClient(client: AccountDTO): Observable<AccountDTO> {
    return this.http.delete<AccountDTO>(`accounts/${client.id}?hard=true`);
  }

  /**
   * Create need for a company
   * @param {NeedDTO} need
   * @param companyId
   */
  createNeed(need: NeedDTO, companyId: string): Observable<NeedDTO[]> {
    return this.http
    .post<Needs>(`needs/company/${companyId}`, need)
    .pipe(map((result: Needs) => result.data));
  }

  /**
   * Create need for a company from consort NT
   * @param {BoardingNeedDTO} need
   * @param companyId
   */
  createBoardingNeed(need: BoardingNeedDTO): Observable<NeedDTO> {
    return this.http
    .post<NeedDTO>(`needs/boarding/company`, need);
  }

  /**
   * Update a specific need
   * @param {NeedDTO} need
   */
  updateNeed(need: NeedDTO): Observable<NeedDTO> {
    return this.http.patch<NeedDTO>(`needs/${need.id}`, need);
  }

  /**
   * Get All Need of company
   * @param {string} need Id
   */
  getAllNeeds(company: string, param = {}): Observable<NeedDTO[]> {
    return this.http.get<Needs>(`needs/company/${company}`, param)
    .pipe(map((result: Needs) => result.data));
  }

  /**
   * Need a specific need
   * @param {string} need Id
   */
  getNeed(need: string): Observable<NeedDTO> {
    return this.http.get<NeedDTO>(`needs/${need}`);
  }

  /**
   * Assign freelances to specific need
   * @param companyId
   * @param needId
   * @param freelancesId
   * @param tjmProposal
   */
  assignFreelanceToNeed(
    companyId: string,
    needId: string,
    freelanceId: string[],
    tjmProposal: number): Observable<NeedDTO> {
    const data = { 'needId': needId, 'freelanceId': freelanceId, 'tjmProposal': tjmProposal};
    return this.http.patch<NeedDTO>(`companies/${companyId}/assign`, data);
  }

  /**
   * Accept a freelance for a need
   * @param companyId
   * @param needId
   * @param freelanceId
   */
  acceptFreelanceForNeed(companyId: string, needId: string, freelanceId: string) {
    return this.http.patch<CompanyPublicDTO>(`companies/${companyId}/accept`, { 'needId': needId, 'freelanceId': freelanceId });
  }

  /**
   * Refuse a freelance for a need
   * @param companyId
   * @param needId
   * @param freelanceId
   */
  refuseFreelanceForNeed(companyId: string, needId: string, freelanceId: string, reason: string) {
    return this.http.patch<CompanyPublicDTO>(`companies/${companyId}/refuse`,
    {'needId': needId,
    'freelanceId': freelanceId,
    'companyReason': reason });
  }

  /**
   * Confirm a freelance for a need
   * @param companyId
   * @param needId
   * @param freelanceId
   * @param freelanceNeedId
   */
  confirmFreelanceForNeed(companyId: string, needId: string, freelanceId: string, freelanceNeed: string) {
    return this.http.patch<CompanyPublicDTO>(`companies/${companyId}/confirm`, {
      needId: needId,
      freelanceId: freelanceId,
      id: freelanceNeed
    });
  }

  /**
   * Get All Companies
   * @return {CompanyPublicDTO[]}
   */
  getAll(): Observable<CompanyPublicDTO[]> {
    return this.http.get<CompaniesDTO>('companies')
      .pipe(map((res) => {
        return res.data;
      }));
  }

  /**
   * Get Companies with params
   * @return {CompanyPublicDTO[]}
   */
  getCompanies(params: CompaniesParams): Observable<CompanyPublicDTO[]> {
    return this.http.get<CompaniesDTO>('companies/clients', params)
      .pipe(map((res) => {
        return res.data;
      }));
  }

  /**
   * Search company
   * @param params
   * @return {Observable<CompanyPublicDTO>}
   */
  search(params: CompaniesParams): Observable<CompanyPublicDTO[]> {
    return this.http.get<CompaniesDTO>('companies', params)
      .pipe(map((res) => {
        return res.data;
      }));
  }

  /**
   * Get contacts from a company
   */
   getContacts(companyId: string) {
     return this.http.get<AccountDTO[]>(`companies/${companyId}/accounts`);
   }
}
