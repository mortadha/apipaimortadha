import { Component, OnInit } from '@angular/core';
import { BoardingClientService } from '../../service/boarding.client.service';

@Component({
  selector: 'app-need-final',
  templateUrl: './need-final.component.html',
  styleUrls: ['./need-final.component.scss']
})
export class NeedFinalComponent implements OnInit {
  private agentNumber: number;
  public agent;
  constructor(
    private boardingService: BoardingClientService
    ) { }

  ngOnInit() {
    this.boardingService.resetNeed();
    this.agentNumber = Math.round(Math.random());
    if (this.agentNumber === 0) {
      this.agent = {
        name: 'Laura',
        position: 'Responsable du Développement RH',
        mail : 'laura@neadz.it',
        linkedinLabel: 'linkedin/laurableuze',
        linkedin: 'https://www.linkedin.com/in/laura-bleuze-975a6b80/',
        imageurl: 'https://res.cloudinary.com/dqgfi8kqd/image/upload/c_scale,h_300,q_100/v1554128379/boarding/Laura.jpg'
      };
    } else if (this.agentNumber === 1) {
      this.agent = {
        name: 'Adèle',
        position: 'Chargée de Développement RH',
        mail : 'adele@neadz.it',
        linkedinLabel: 'linkedin/adelethoumie',
        linkedin: 'https://www.linkedin.com/in/adèle-thoumie-32555bb6/',
        imageurl :  'https://res.cloudinary.com/dqgfi8kqd/image/upload/c_scale,h_300,q_100/v1554128374/boarding/Adèle.jpg'
      };
    }
  }

}
