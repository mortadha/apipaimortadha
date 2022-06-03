import { Injectable } from '@angular/core';
import { FreelanceNeedDTO, CraDTO, MissionDTO, CraDayDTO, BillDTO, SignatureDTO } from '@neadz/dtos';
import { ApiService } from '@app/core/services/api.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/internal/operators/map';

export interface Missions {
  data: MissionDTO[];
  total: Number;
}

export interface FreelanceNeeds {
  data: FreelanceNeedDTO[];
  total: Number;
}

export interface Bills {
  data: BillDTO[];
  total: Number;
}

@Injectable()
export class MissionsService {
  constructor(private http: ApiService) {
    this.http = http;
  }

  /**
   * Mission list all
   */
  getAll(params?: {}) {
    return this.http.get('missions', params)
      .pipe(map((res) => {
        return res;
      }));
  }

 /**
   * Get current mission
   * @param {string} forFreelance freelance ID
   * @return {Observable<CurrentMissionData>}
   */
  getCurrentMission(forFreelance: string): Observable<Missions> {
    return this.http.get<Missions>(`missions/freelance/${forFreelance}/current`);
  }

  getFreelanceMission(forFreelance: string): Observable<Missions> {
    return this.http.get<Missions>(`missions/freelance/${forFreelance}`);
  }

 /**
   * Get mission
   * @param {string} idMission missionId ID
   * @return {Observable<Missions>}
   */
  getMission(idMission: string): Observable<MissionDTO> {
    return this.http.get<MissionDTO>(`missions/${idMission}`);
  }

  /**
   * Update mission
   * @param {MissionDTO} mission mission
   * @return {Observable<MissionDTO>}
   */
  updateMission(mission: MissionDTO): Observable<MissionDTO> {
    return this.http.patch<MissionDTO>(`missions/${mission.id}`, mission);
  }

   /**
   * Get missions for a company
   * @param {string} idMission missionId ID
   * @return {Observable<Missions>}
   */
  getMissionCompany(idCompany: string) {
    return this.http.get(`missions/company/${idCompany}`);
  }

  /**
   * Update Freelance CRA
   * @param {CraDTO} cra cra
   * @return {Observable<CraDTO>}
   */
  updateCra(cra: CraDTO): Observable<CraDTO> {
    return this.http.patch<CraDTO>(`cras/${cra.id}`, cra);
  }

  /**
   * Validate Freelance CRA
   * @param {CraDTO} cra cra
   * @return {Observable<CraDTO>}
   */
  validateCra(cra: CraDTO): Observable<CraDTO> {
    return this.http.patch<CraDTO>(`cras/${cra.id}/validate`, cra);
  }

  /**
   * Accept Freelance CRA
   * @param {CraDTO} cra cra
   * @return {Observable<CraDTO>}
   */
  acceptCra(cra: CraDTO): Observable<CraDTO> {
    return this.http.patch<CraDTO>(`cras/${cra.id}/accept-all`, cra);
  }

  /**
   * Refuse Freelance CRA
   * @param {string} craId craId
   * @return {Observable<CraDTO>}
   */
  refuseCra(craId: string, refuseDescription: string): Observable<CraDTO> {
    return this.http.patch<CraDTO>(`cras/${craId}/refuse-all`, { refuse: refuseDescription });
  }

  /**
   * Update Freelance CRA Day
   * @param {CraDayDTO} craDay cra day
   * @return {Observable<CraDayDTO>}
   */
  updateCraDay(craDay: CraDayDTO): Observable<CraDayDTO> {
    return this.http.patch<CraDayDTO>(`craDays/${craDay.id}`, craDay);
  }

  /**
   * Get needs for a specific freelance
   * @param {string} forFreelance freelance ID
   * @return {Observable<FreelanceNeedDTO[]>}
   */
  getNeeds(forFreelance: string): Observable<FreelanceNeedDTO[]> {
    return this.http
    .get<FreelanceNeeds>(`needs/freelance/${forFreelance}/proposal`)
    .pipe(map((result: FreelanceNeeds) => result.data));
  }

  /**
   * Accept Need of company from freelance
   * @param {string} ofCompany company ID
   * @return {Observable<NeedDTO[]>}
   */
  acceptNeed(ofCompany: string, need: FreelanceNeedDTO): Observable<FreelanceNeedDTO> {
    return this.http.patch<FreelanceNeedDTO>(`companies/${ofCompany}/acceptNeed`, need);
  }

  /**
   * Refuse Need of company from freelance
   * @param {string} ofCompany freelance ID
   * @return {Observable<NeedDTO[]>}
   */
  refuseNeed(ofCompany: string, need: FreelanceNeedDTO): Observable<FreelanceNeedDTO> {
    return this.http.patch<FreelanceNeedDTO>(`companies/${ofCompany}/refuseNeed`, need);
  }

  /**
     * Get bills
     * @return {Observable<BillDTO[]>}
   */
  getBills(): Observable<BillDTO[]> {
    return this.http
    .get<Bills>(`bills`)
    .pipe(map((bills: Bills) => bills.data));
  }

  /**
   * Get bills
   * @return {Observable<BillDTO[]>}
   */
  createBill(forMission: string): Observable<BillDTO[]> {
    return this.http.post<BillDTO[]>(`bills/mission/${forMission}`, {});
  }

  /**
   * Get Signature
   */
  getSignature(craId: string) {
    return this.http.get<SignatureDTO>(`signature/cra/${craId}`);
  }

  /**
   * Update Company Status
   */
  updateStatusNeedCompany(companyID: string, FreelanceNeed: FreelanceNeedDTO) {
    return this.http.patch<FreelanceNeedDTO>(`companies/${companyID}/cstatus`, FreelanceNeed);
  }

  /**
   * Update Freelance Status
   */
  updateStatusNeedFreelance(companyID: string, FreelanceNeed: FreelanceNeedDTO) {
    return this.http.patch<FreelanceNeedDTO>(`companies/${companyID}/fstatus`, FreelanceNeed);
  }

  /**
   * Validate Mission
   */
  confirmStatusNeedFreelance(companyID: string, FreelanceNeed: FreelanceNeedDTO, tjm: number, cjm: number, date: string) {
    return this.http.patch<FreelanceNeedDTO>(
      `companies/${companyID}/cstatus?tjmMission=${tjm}&cjmMission=${cjm}&date=${date}`
      , FreelanceNeed);
  }

  /**
   * Get all missions
   */
  getAllMissions() {
    return this.http.get<Missions>(`missions`);
  }
}
