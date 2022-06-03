import { Component, OnInit, OnDestroy } from '@angular/core';
import { TechDTO, SkillDTO, FreelancePrivateDTO} from '@neadz/dtos';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { startWith, map, takeUntil } from 'rxjs/operators';
import { Subject, Observable } from 'rxjs';
import { Router } from '@angular/router';

// Services
import { NotificationType, NotificationService, TechService } from '@app/core/services';
import { BoardingFreelanceService } from '../../../freelance/service/boarding.freelance.service';
@Component({
  selector: 'app-freelance-profile',
  templateUrl: './freelance-profile.component.html',
  styleUrls: ['./freelance-profile.component.scss']
})
export class FreelanceProfileComponent implements OnInit, OnDestroy {
  link: string;
  freelance: FreelancePrivateDTO;
  profileProposal: string[];
  techs: TechDTO[];
  myControl = new FormControl();
  filteredOptions: Observable<TechDTO[]>;
  private componentDestroyed = new Subject();
  submitted = false;
  form: FormGroup;

  constructor(private boardingService: BoardingFreelanceService,
    private notification: NotificationService,
    private techService: TechService,
    public router: Router) {}

  ngOnInit() {
    this.profileProposal = this.boardingService.getProfileProposal();
    this.link = this.boardingService.getLink();
    this.freelance = this.boardingService.getCurrentBoardingFreelance();
    if (!this.freelance.headline) {
      this.freelance.headline = '';
    }
    if (!this.freelance.skills) {
      this.freelance.skills = [];
    }
    this.techService.getAll()
    .pipe(takeUntil(this.componentDestroyed))
    .subscribe((res: TechDTO[]) => {
      this.techs = res;
    });
    // Handle Filter
    this.handleFilter();

    this.form = new FormGroup({
      'tjm': new FormControl(this.freelance.tjm, [
        Validators.required,
        Validators.min(1)
      ])
    });
  }

  get tjmForm () { return this.form.get('tjm'); }

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
    return this.freelance.skills.length;
  }

  /**
   * When Client removes a tech
   * @param $event
   */
  removeSkill(techId) {
    const deletedSkill = this.freelance.skills.find((value) => value.tech.id === techId);
    this.freelance.skills = this.freelance.skills.filter((value) => value.tech.id !== techId);
    this.techs.push(deletedSkill.tech);
  }

  /**
   * When user change value of a specific skill
   * @param $event new value in %
   * @param skill Skill to update
   */
  skillLevelChanged($event, skill) {
    this.freelance.skills.find((value) => value.tech.id === skill.tech.id).level = $event;
  }

  checkInput() {
    if (!this.freelance.headline || this.freelance.skills.length < 1 || this.tjmForm.errors) {
      return false;
    } else {
      return true;
    }
  }

  next() {
    this.submitted = true;
    if (this.checkInput()) {
      this.freelance.tjm = this.tjmForm.value;
      this.freelance.headline = `${this.freelance.headline} ${this.boardingService.getCategory()}`;
      this.router.navigate([this.link, { outlets: { etape: '2' } }]);
    }
  }

  previous() {
    this.router.navigate([this.link, {outlets: {etape: null}}]);
  }


  getCategory() {
    return this.boardingService.getCategory();
  }
}
