import { Component, OnInit } from '@angular/core';
import { FreelancePrivateDTO } from '@neadz/dtos';
import { UserService } from '@app/core/services';

@Component({
  selector: 'app-info-profile',
  templateUrl: './info-profile.component.html',
  styleUrls: ['./info-profile.component.scss']
})
export class InfoProfileComponent implements OnInit {
  public freelance: FreelancePrivateDTO;
  public completionPercentage = 100;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.freelance = this.userService.getFreelance();
    this.completionPercentage = this.freelance.completion;
  }
}
