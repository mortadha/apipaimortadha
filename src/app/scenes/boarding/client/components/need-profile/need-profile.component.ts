import { Component, OnInit, OnDestroy } from '@angular/core';
import { NeedDTO, TechDTO, SkillDTO} from '@neadz/dtos';
import { Subject, Observable } from 'rxjs';
import { FormControl } from '@angular/forms';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';

// Services
import { BoardingClientService } from '../../service/boarding.client.service';
import { NotificationType, NotificationService, TechService } from '@app/core/services';
@Component({
  selector: 'app-need-profile',
  templateUrl: './need-profile.component.html',
  styleUrls: ['./need-profile.component.scss']
})
export class NeedProfileClientComponent implements OnInit, OnDestroy {
  link: string;
  need: NeedDTO;
  profileProposal: string[];
  techs: TechDTO[];
  myControl = new FormControl();
  filteredOptions: Observable<TechDTO[]>;
  private componentDestroyed = new Subject();
  submitted = false;

  constructor(private boardingService: BoardingClientService,
    private notification: NotificationService,
    private techService: TechService,
    public router: Router) {}

  ngOnInit() {
    this.profileProposal = this.boardingService.getProfileProposal();
    this.link = this.boardingService.getLink();
    this.need = this.boardingService.getCurrentNeed();
    if (!this.need.jobTitle) {
      this.need.jobTitle = '';
    }
    if (!this.need.skills) {
      this.need.skills = [];
    }
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
    if (this.need.skills.length >= 6) {
      this.notification.show({
        title: 'Compétences',
        message: 'Six compétences maximum',
        type: NotificationType.error
      });
    } else {
      const skill = new SkillDTO();
      skill.level = 50;
      skill.tech = tech;
      this.need.skills.push(skill);
    }
    this.techs = this.techs.filter(option => option.id !== tech.id);
  }

  handleSearchSkill(text: string): TechDTO[] {
    let result: TechDTO[] = [];
    if (this.techs !== undefined) {
      result = this.techs.filter(option => option.name.toLowerCase().indexOf(text) === 0);
    }
    return result;
  }

  inputDisplay() {
    return null;
  }

  getSkillLength() {
    return this.need.skills.length;
  }

  /**
   * When Client removes a tech
   * @param $event
   */
  removeSkill(techId) {
    const deletedSkill = this.need.skills.find((value) => value.tech.id === techId);
    this.need.skills = this.need.skills.filter((value) => value.tech.id !== techId);
    this.techs.push(deletedSkill.tech);
  }

  /**
   * When user change value of a specific skill
   * @param $event new value in %
   * @param skill Skill to update
   */
  skillLevelChanged($event, skill) {
    this.need.skills.find((value) => value.tech.id === skill.tech.id).level = $event;
  }

  checkInput() {
    if (!this.need.jobTitle) {
      return false;
    } else if (this.need.skills.length < 1) {
      return false;
    }
    return true;
  }

  next() {
    this.submitted = true;
    if (this.checkInput()) {
      this.need.jobTitle = `${this.need.jobTitle} ${this.boardingService.getCategory()}`;
      this.router.navigate([this.link, { outlets: { etape: '2' } }]);
    }
  }

  getCategory() {
    return this.boardingService.getCategory();
  }
}
