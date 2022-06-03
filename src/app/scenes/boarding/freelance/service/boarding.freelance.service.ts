import { Injectable } from '@angular/core';

import { FreelancePrivateDTO } from '@neadz/dtos';

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
export class BoardingFreelanceService {
  private boardingFreelance: FreelancePrivateDTO;
  private currentEnv: EnvTechnoType;
  private agentToken: string;

  constructor() {
  }


  newBoardingFreelance() {
    this.currentEnv = EnvTechnoType.None;
    this.boardingFreelance = new FreelancePrivateDTO;
  }

  /**
   * Select an environment
   * @param type Environment type
   */
  selectEnv(type: EnvTechnoType) {
    this.currentEnv = type;
  }

    /**
   * Get current boarding freelance
   */
  getCurrentBoardingFreelance(): FreelancePrivateDTO | undefined {
    return this.boardingFreelance;
  }

  /**
   * Get proper link
   */
  getLink(): string {
    return './boarding/freelance';
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

  resetFreelance() {
    this.boardingFreelance = undefined;
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

  setAgentToken(token: string) {
    this.agentToken = token;
  }

  getAgentToken() {
    return this.agentToken;
  }
}
