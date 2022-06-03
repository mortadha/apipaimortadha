import { Injectable } from '@angular/core';

import { NeedDTO, BoardingNeedDTO } from '@neadz/dtos';

export enum EnvTechnoType {
  None,
  Web,
  Mobile,
  Design,
  Autre,
  Cloud,
  Agile
}

@Injectable()
export class BoardingClientService {
  private boardingNeed: BoardingNeedDTO;
  private currentEnv: EnvTechnoType;
  private _isConsort: boolean;

  constructor() {
    this._isConsort = false;
  }

  newBoardingNeed() {
    this.currentEnv = EnvTechnoType.None;
    this.boardingNeed = new BoardingNeedDTO();
    this.boardingNeed.need = new NeedDTO();
  }

  /**
   * Define if actual user is from consort
   * @param consort Yes or No
   */
  setIsConsort(consort: boolean) {
    this._isConsort = consort;
  }

  /**
   * Tell if actual user is from consort
   * @return Yes or No
   */
  isConsort() {
    return this._isConsort;
  }

  /**
   * Select an environment
   * @param type Environment type
   */
  selectEnv(type: EnvTechnoType) {
    this.currentEnv = type;
  }

  /**
   * Get current need
   */
  getCurrentNeed(): NeedDTO | undefined {
    if (this.boardingNeed === undefined) {
      return undefined;
    } else {
      return this.boardingNeed.need;
    }
  }

  /**
   * Get current boarding need
   */
  getCurrentBoardingNeed(): BoardingNeedDTO | undefined {
    return this.boardingNeed;
  }

  /**
   * Get proper link
   */
  getLink(): string {
    if (this.isConsort()) {
      return '/boarding/consort';
    } else {
      return '/boarding/entreprise';
    }
  }

  /**
   * Get profile proposal depending on env type setted
   */
  getProfileProposal(): string[] {
    let res: string[] = [];
    switch (this.currentEnv) {
      case EnvTechnoType.Web:
      res = ['Développeur', 'Lead', 'Architecte', 'Expert', 'CTO'];
      break;

      case EnvTechnoType.Mobile:
      res = ['Développeur', 'Lead', 'Architecte', 'Expert', 'CTO'];
      break;

      case EnvTechnoType.Autre:
      res = ['Développeur', 'Lead', 'Architecte', 'Expert', 'Chef de projet'];
      break;

      case EnvTechnoType.Design:
      res = ['UX Designer', 'UI Designer', 'UX/UI Designer', 'Ergonome'];
      break;

      case EnvTechnoType.Cloud:
      res = ['Ingénieur', 'Architecte'];
      break;

      case EnvTechnoType.Agile:
      res = ['Coach Agile', 'Scrum Master', 'Product Owner'];
      break;
    }
    return res;
  }

  resetNeed() {
    this.boardingNeed = undefined;
  }

  getCategory(): String {
    switch (this.currentEnv) {
      case EnvTechnoType.Web:
        return 'web';

      case EnvTechnoType.Mobile:
        return 'mobile';

      case EnvTechnoType.Autre:
        return '';

      case EnvTechnoType.Design:
        return 'design';

      case EnvTechnoType.Cloud:
        return 'cloud';

      case EnvTechnoType.Agile:
        return 'agile';
    }
  }
}
