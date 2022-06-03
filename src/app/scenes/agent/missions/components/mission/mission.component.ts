import { Component, OnInit, Input } from '@angular/core';
import { MissionDTO } from '@neadz/dtos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mission',
  templateUrl: './mission.component.html',
  styleUrls: ['./mission.component.scss']
})
export class MissionComponent implements OnInit {
  @Input() mission: MissionDTO;

  constructor(private router: Router) {}

  ngOnInit() {
  }

  seeDetails() {
    this.router.navigateByUrl(`/agent/cra/${this.mission.id}`);
  }

  /**
   * Tell if user has a profile picture
   */
  hasProfilePicture(): boolean {
    return this.mission.freelance.account &&
      this.mission.freelance.account.profilePicture &&
      this.mission.freelance.account.profilePicture.url &&
      this.mission.freelance.account.profilePicture.url.length > 0;
  }
}
