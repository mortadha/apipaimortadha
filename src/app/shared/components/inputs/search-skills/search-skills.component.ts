import { Component, OnInit, Input } from '@angular/core';
import { NeedDTO, TechDTO, SkillDTO } from '@neadz/dtos';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { TechService } from '@app/core/services';
import { takeUntil, startWith, map } from 'rxjs/operators';

@Component({
  selector: 'app-input-search-skills',
  templateUrl: './search-skills.component.html',
  styleUrls: ['./search-skills.component.scss'],
})
export class SearchSkillsComponent implements OnInit {
  @Input() need: NeedDTO;
  techs: TechDTO[];
  myControl = new FormControl();
  filteredOptions: Observable<TechDTO[]>;
  private componentDestroyed = new Subject();

  constructor(private techService: TechService) {}

  ngOnInit() {
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
      // this.notification.show({
      //   title: 'Compétences',
      //   message: 'Six compétences maximum',
      //   type: NotificationType.error
      // });
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
}
