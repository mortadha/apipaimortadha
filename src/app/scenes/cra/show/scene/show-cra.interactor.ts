import { CraDayDTO, MissionDTO, CraDTO } from '@neadz/dtos';
import { UserService } from '@app/core/services/user.service';
import { takeUntil, map } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { MissionsService, Missions } from '@app/core/services/missions.service';
import { ShowCraWorker } from './show-cra.worker';
import { Injectable, Input } from '@angular/core';

@Injectable()
export class ShowCraInteractor {
    public currentMission: MissionDTO;
    public currentCra: CraDTO;
    public selectedMonthIndex = 0;
    private worker = new ShowCraWorker();

    constructor(public userService: UserService,
        public missionService: MissionsService) {
    }

    /**
     * Load Mission Information
     */
    loadInformation(mission: MissionDTO) {
        this.currentMission = mission;
        this.loadSelectedMonth();
    }

    /**
     * Load Selected Month
     */
    loadSelectedMonth() {
        this.currentCra = this.currentMission.cras[this.selectedMonthIndex];
        this.currentCra.craDays = !this.currentCra.craDays.length
        ? this.worker.getMonth(this.currentCra.date)
        : this.worker.updateMonth(this.currentCra.date, this.currentCra.craDays);
    }

    /**
     * Update Cra of freelance
     * @param {CraDayDTO[]} newCra New cra to update
     */
    updateCra(newCra: CraDayDTO[]): Observable<CraDTO> {
        this.currentCra.craDays = newCra;
        return this.missionService
        .updateCra(this.currentCra)
        .pipe(map((result: CraDTO) => {
            result.craDays = this.worker.updateMonth(result.date, result.craDays);
            this.currentCra = result;
            this.currentMission.cras[this.selectedMonthIndex] = result;
            return result;
        }));
    }

    /**
     * Validate Cra of freelance
     * @param {CraDayDTO[]} newCra New cra to update
     */
    validateCra(newCra: CraDayDTO[]): Observable<CraDTO> {
        this.currentCra.craDays = newCra;
        return this.missionService
        .validateCra(this.currentCra)
        .pipe(map((result: CraDTO) => {
            result.craDays = this.worker.updateMonth(result.date, result.craDays);
            this.currentMission.cras[this.selectedMonthIndex] = result;
            this.currentCra = result;
            return result;
        }));
    }

    /**
     * Accept Cra of freelance
     * @param {CraDayDTO[]} newCra New cra to update
     */
    acceptCraFreelance(newCra: CraDayDTO[]): Observable<CraDTO> {
        this.currentCra.craDays = newCra;
        return this.missionService
        .acceptCra(this.currentCra)
        .pipe(map((result: CraDTO) => {
            result.craDays = this.worker.updateMonth(result.date, result.craDays);
            this.currentCra = result;
            this.currentMission.cras[this.selectedMonthIndex] = result;
            return result;
        }));
    }

    /**
     * Refuse Cra of freelance
     * @param {string} craId Cra Id to refuse
     */
    refuseCraFreelance(craId: string, refuseDescription: string): Observable<CraDTO> {
        return this.missionService
        .refuseCra(craId, refuseDescription)
        .pipe(map((result: CraDTO) => {
            result.craDays = this.worker.updateMonth(result.date, result.craDays);
            this.currentCra = result;
            this.currentMission.cras[this.selectedMonthIndex] = result;
            return result;
        }));
    }

    /**
     * Update Cra Day of freelance
     * @param {CraDayDTO} newCraDay New cra day to update
     */
    updateCraDay(newCraday: CraDayDTO): Observable<CraDayDTO> {
        return this.missionService
        .updateCraDay(newCraday)
        .pipe(map((result: CraDayDTO) => {
            return result;
        }));
    }

    switchMonthCra(monthIndex: number) {
        this.selectedMonthIndex = monthIndex;
        this.loadSelectedMonth();
    }
}
