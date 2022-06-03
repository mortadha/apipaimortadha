import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';

import * as _moment from 'moment';
const moment = _moment;

// Services
import { FreelanceService, ProfileService, UserService, TechService} from '@app/core/services/';
import {
  FreelancePrivateDTO,
  AccountType,
  AuthDTO,
  TechDTO,
  SkillDTO,
} from '@neadz/dtos';
import { Subject, Observable, BehaviorSubject } from 'rxjs';
import { takeUntil, map, startWith } from 'rxjs/operators';
import { MatDialogRef } from '@angular/material/dialog';
import { FormControl} from '@angular/forms';
import { NotificationService, NotificationType } from '@app/core/services/notification.service';

@Component({
  selector: 'app-profile-tech-modal',
  templateUrl: './profile-tech-modal.component.html',
  styleUrls: ['./profile-tech-modal.component.scss']
})
export class ProfileTechModalComponent implements OnInit, OnDestroy {
  techs: TechDTO[];
  freelance: FreelancePrivateDTO;
  techSearchText: string;
  user: AuthDTO;
  private originalFreelance: FreelancePrivateDTO;
  private componentDestroyed = new Subject();
  myControl = new FormControl();
  filteredOptions: Observable<TechDTO[]>;
  descriptionLength = new BehaviorSubject(0);
  public textControl = new FormControl('');

  constructor(
    public dialogRef: MatDialogRef<ProfileTechModalComponent>,
    private techService: TechService,
    private profileService: ProfileService,
    private freelanceService: FreelanceService,
    private userService: UserService,
    private notification: NotificationService) {
    this.textControl.valueChanges.subscribe((v) => this.descriptionLength.next(v.length));
    this.freelance = <FreelancePrivateDTO>this.profileService.getCurrentFreelance();
    this.originalFreelance = new FreelancePrivateDTO();
    Object.assign(this.originalFreelance, this.freelance);
    if (!this.freelance.bio) {
      this.freelance.bio = '';
    }

  }
    ngOnInit() {
    // Get user info
    this.user = this.userService.getCurrentUser();
    // Get all techs
    this.techService.getAll()
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res: TechDTO[]) => {
      this.techs = res;
    });
    // Handle Filter
    this.handleFilter();
  }

  ngOnDestroy() {
    this.componentDestroyed.next();
    this.componentDestroyed.unsubscribe();
  }

  handleFilter() {
    // This handle the autocomplete for the competences
    this.filteredOptions = this.myControl.valueChanges
    .pipe(
      startWith(''),
      map((name) => {
        if (typeof name !== 'string') {
          this.handleAddSkill(name);
          return null;
        } else {
          return this.handleSearchSkill(name.toLowerCase());
        }
      })
    );
  }

  handleAddSkill(tech: TechDTO) {
    if (this.freelance.skills.length >= 6) {
      this.notification.show({
        title: 'Compétences',
        message: 'Six compétences maximum',
        type: NotificationType.error
      });
    } else {
      const skill = new SkillDTO();
      skill.level = 50;
      skill.tech = tech;
      this.freelance.skills.push(skill);
    }
    this.techs = this.techs.filter(option => option.id !== tech.id);
  }

  handleSearchSkill(text: string): TechDTO[] {
    let result = [];
    if (this.techs !== undefined) {
      result = this.techs.filter(option => option.name.toLowerCase().indexOf(text) === 0);
    }
    return result;
  }

  inputDisplay() {
    return null;
  }

  /**
   * When user change value of a specific skill
   * @param $event new value in %
   * @param skill Skill to update
   */
  freelanceSkillLevelChanged($event, skill) {
    this.freelance.skills.find((value) => value.tech.id === skill.tech.id).level = $event;
  }

  /**
   * When freelance removes a Skill
   * @param $event
   */
  removeSkill(techId) {
    const deletedSkill = this.freelance.skills.find((value) => value.tech.id === techId);
    this.freelance.skills = this.freelance.skills.filter((value) => value.tech.id !== techId);
    this.techs.push(deletedSkill.tech);
  }

  checkInput() {
   if (this.freelance.skills.length === 0) {
      this.notification.show({
        title: 'Compétence',
        message: 'La liste des compétences ne peut être vide',
        type: NotificationType.error
      });
      return false;
    } else {
      return true;
    }
  }

  /**
   * When user confirm information updates
   */
  submit() {
    if (this.checkInput()) {
      this.freelanceService.update(this.freelance)
      .pipe(takeUntil(this.componentDestroyed))
      .subscribe((result: FreelancePrivateDTO) => {
        this.profileService.setCurrentFreelance(result);
        this.dialogRef.close();
        this.notification.show({
          title: 'Profil mis à jour',
          message: 'Votre profil a bien été mis à jour',
          type: NotificationType.success
        });
      }, (error) => {
        this.notification.show({
          title: 'Profil mis à jour',
          message: error,
          type: NotificationType.error
        });
      });
    }
  }

  /**
   * Callback to close modal
   */
  close() {
    this.profileService.setCurrentFreelance(this.originalFreelance);
    this.dialogRef.close();
  }
}
