import { Component, OnInit } from '@angular/core';
import { EnvTechnoType, BoardingFreelanceService } from '../../../freelance/service/boarding.freelance.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-domain',
  templateUrl: './select-domain.component.html',
  styleUrls: ['./select-domain.component.scss']
})
export class SelectDomainFreelanceComponent implements OnInit {
  public envType = EnvTechnoType;

  constructor(private boardingService: BoardingFreelanceService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.boardingService.newBoardingFreelance();
  }

  /**
   * User trigger to go next step
   * @param type Type of technos selected
   */
  next(type: EnvTechnoType) {
    this.boardingService.selectEnv(type);
    this.boardingService.setAgentToken(this.route.snapshot.queryParamMap.get('token'));
    this.router.navigate(['.', { outlets: { etape: '1' } }], { relativeTo: this.route });
  }
}
