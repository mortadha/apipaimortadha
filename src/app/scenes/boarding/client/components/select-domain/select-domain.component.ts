import { Component, OnInit } from '@angular/core';
import { EnvTechnoType, BoardingClientService } from '../../service/boarding.client.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-select-domain',
  templateUrl: './select-domain.component.html',
  styleUrls: ['./select-domain.component.scss']
})
export class SelectDomainClientComponent implements OnInit {
  public envType = EnvTechnoType;

  constructor(private boardingService: BoardingClientService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.boardingService.newBoardingNeed();
  }

  /**
   * User trigger to go next step
   * @param type Type of technos selected
   */
  next(type: EnvTechnoType) {
    this.boardingService.selectEnv(type);
    this.router.navigate(['.', { outlets: { etape: '1' } }], { relativeTo: this.route });
  }
}
