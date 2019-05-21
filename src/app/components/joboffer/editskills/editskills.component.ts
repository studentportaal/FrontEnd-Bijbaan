
import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {MatAutocompleteSelectedEvent} from "@angular/material/typings/esm5/autocomplete";
import {MatAutocomplete, MatChipInputEvent} from "@angular/material";
import {Skill} from "../../../domain/Skill";
import {COMMA, ENTER} from "@angular/cdk/keycodes";
import {FormControl} from "@angular/forms";
import {SkillService} from "../../../services/skill/skill.service";

@Component({
  selector: 'app-edit-skills',
  templateUrl: './editskills.component.html',
  styleUrls: ['./editskills.component.scss']
})
export class EditSkillsComponent implements OnInit {

  @Input() element: any;

  skills: Skill[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private skillService: SkillService) {
    this.skillCtrl.valueChanges.subscribe((value) => {
      this.searchSkills(value);
    });

    this.skillService.get().subscribe((response) => {
      this.skills = response;
    });
  }

  ngOnInit() {
  }


  selected(event: MatAutocompleteSelectedEvent) {
    const skill = event.option.value;
    this.element.skills.push(skill);
    this.skillInput.nativeElement.value = '';
    this.skillCtrl.setValue(null);
  }

  add(event: MatChipInputEvent): void {
    // To make sure this does not conflict with OptionSelected Event
    if (this.matAutocomplete.isOpen) {
      return;
    }

    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      const skill = new Skill();
      skill.name = value.trim();

      this.skillService.add(skill).subscribe((response) => {
        this.skills.push(response);
      });
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }

    this.skillCtrl.setValue(null);

  }

  removeSkill(skill: Skill) {
    this.element.skills.splice(this.element.skills.indexOf(skill, 0), 1);
  }

  searchSkills(query: string) {
    if (!query) {
      this.skillService.get().subscribe((response) => {
        this.skills = response;
      });
    }

    this.skillService.search(query).subscribe((response) => {
      this.skills = response;
    });
  }
}
