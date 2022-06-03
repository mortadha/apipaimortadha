import { CraDayDTO, CraDayType } from '@neadz/dtos';
import * as moment from 'moment';
import * as publicHoliday from 'moment-ferie-fr';

interface MonthInfo {
    prevMonth: moment.Moment;
    daysCurrentMonth: number;
    startWeekDay: number;
    nbEndDay: number;
}

export class ShowCraWorker {
    private nbDaysInWeek = 7;
    private maxNbDays = 42;

    constructor() { }

    /**
     * This method get current month
     */
    getCurrentMonth(): CraDayDTO[] {
        const currentDate = moment().toDate();
        return this.getMonth(currentDate);
    }

    /**
     * Get Cra Calendar Dates depending on month date parameter
     * @param date used for generating the cra calendar dates
     */
    getMonth(date: Date) {
        const data: MonthInfo = this.computeMonthInformation(moment(date));
        return [
            ...this.startDisabledDays(data.prevMonth, data.startWeekDay),
            ...this.daysOfMonth(moment(date)),
            ...this.endDisabledDays(data.nbEndDay),
        ];
    }

    /**
     * Update Cra Calendar Dates depending on month date parameter
     * @param date used for generating the cra calendar dates
     * @param cra already existing cra days with status
     */
    updateMonth(date: Date, cra: CraDayDTO[]) {
        const data: MonthInfo = this.computeMonthInformation(moment(date));
        let result: CraDayDTO[] = [];
        if ((data.daysCurrentMonth + data.nbEndDay + data.startWeekDay) === cra.length) {
            result = cra;
        } else {
            result = [
                ...this.startDisabledDays(data.prevMonth, data.startWeekDay),
                ...cra.sort((n1, n2) => n1.day - n2.day),
                ...this.endDisabledDays(data.nbEndDay),
            ];
        }
        return result;
    }

    /**
     * Compute month date information
     */
    computeMonthInformation(date: moment.Moment): MonthInfo {
        const prevMonth = moment(date).subtract(1, 'month');
        const daysInCurrMonth = moment(date).daysInMonth();
        let startWeekDay = moment(date)
            .startOf('month')
            .day();
        startWeekDay = (startWeekDay === 0 ? this.nbDaysInWeek : startWeekDay) - 1;
        const nbEndDay = this.maxNbDays - (daysInCurrMonth + startWeekDay);
        const result: MonthInfo = {
            prevMonth: prevMonth,
            daysCurrentMonth: daysInCurrMonth,
            startWeekDay: startWeekDay,
            nbEndDay: nbEndDay
        };
        return result;
    }

    /**
     * Generate days to show from previous month
     */
    startDisabledDays(prevMonth: moment.Moment, startWeekDay: number): CraDayDTO[] {
        const result: CraDayDTO[] = [];
        // Add Start Disabled Days
        for (let i = startWeekDay - 1; i >= 0; i--) {
            const defaultDisabledDate = new CraDayDTO();
            defaultDisabledDate.status = CraDayType.disabled;
            defaultDisabledDate.halfDay = false;
            defaultDisabledDate.day = prevMonth
                .endOf('month')
                .subtract(i, 'day')
                .date();
            result.push(defaultDisabledDate);
        }
        return result;
    }

    /**
     * Generate days to show from previous month
     */
    daysOfMonth(date: moment.Moment): CraDayDTO[] {
        const result: CraDayDTO[] = [];
        const month = moment(date).month();
        const year = moment(date).year();
        const daysInCurrMonth = moment(date).daysInMonth();
        let days;
        // Add Normal Days

        for (let i = 1; i <= daysInCurrMonth; i++) {
            const defaultDate = new CraDayDTO();
            days = publicHoliday(`
            ${i}-${month + 1}-${year}`, 'DD-MM-YYYY');
            if (days.isFerie() === false && days.isWeekEnd() === false) {
                defaultDate.status = CraDayType.confirmedByFreelance;
            } else {
                defaultDate.status = CraDayType.enabled;
            }
            defaultDate.halfDay = false;
            defaultDate.day = i;
            result.push(defaultDate);
        }
        return result;
    }

    /**
     * Generate days to show from next month
     */
    endDisabledDays(nbEndDay: number): CraDayDTO[] {
        const result: CraDayDTO[] = [];
        // Add End Disabled Days
        for (let i = 1; i < nbEndDay + 1; i++) {
            const defaultDisabledDate = new CraDayDTO();
            defaultDisabledDate.status = CraDayType.disabled;
            defaultDisabledDate.halfDay = false;
            defaultDisabledDate.day = i;
            result.push(defaultDisabledDate);
        }
        return result;
    }
}
