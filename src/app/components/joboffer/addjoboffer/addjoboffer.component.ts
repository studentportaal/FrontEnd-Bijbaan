import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { JobOffer } from 'src/app/domain/JobOffer';
import { JobofferService } from 'src/app/services/joboffer/joboffer.service';
import { MatAutocomplete, MatChipInputEvent, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Company } from 'src/app/domain/Company';
import { SkillService } from "../../../services/skill/skill.service";
import { Skill } from "../../../domain/Skill";
import { COMMA, ENTER } from "@angular/cdk/keycodes";
import { MatAutocompleteSelectedEvent } from "@angular/material/typings/esm5/autocomplete";
import { FormControl } from "@angular/forms";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: 'app-addjoboffer',
  templateUrl: './addjoboffer.component.html',
  styleUrls: ['./addjoboffer.component.scss']
})
export class AddjobofferComponent implements OnInit {

  jobOffer: JobOffer = new JobOffer();
  currentCompany: Company;
  skills: Skill[] = [];
  separatorKeysCodes: number[] = [ENTER, COMMA];
  skillCtrl = new FormControl();

  @ViewChild('skillInput') skillInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto') matAutocomplete: MatAutocomplete;

  constructor(private jobOfferService: JobofferService,
              private authenticationService: AuthenticationService,
              private skillService: SkillService,
              private snackbar: MatSnackBar,
              private router: Router) {

    this.skillCtrl.valueChanges.subscribe((value) => {
      this.searchSkills(value);
    });


  }

  ngOnInit() {
    if (this.authenticationService.isLoggedIn() && this.authenticationService.isCompany()) {
      this.currentCompany = this.authenticationService.user as Company;
      this.skillService.get().subscribe((response) => {
        this.skills = response;
      });

      console.log(this.authenticationService.user);
      console.log(this.currentCompany);
    } else {
      console.log('idk if ur logged in or sum?');
    }
  }

  onSubmit() {
    this.jobOffer.company = this.currentCompany.uuid;
    console.log(this.jobOffer);
    this.jobOfferService.addJobOffer(this.jobOffer).subscribe((response: JobOffer) => {
        const snackbarRef = this.snackbar.open('Job offer successfully created', 'dismiss', {
          duration: 300
        });

        snackbarRef.afterDismissed().subscribe(() => {
          this.router.navigateByUrl('/');
        });
    });
  }

  selected(event: MatAutocompleteSelectedEvent) {
     const skill = event.option.value;
     console.log(skill);
     this.jobOffer.skills.push(skill);
     this.skillInput.nativeElement.value = '';
     this.skillCtrl.setValue(null);
  }

  add(event: MatChipInputEvent): void {
    // To make sure this does not conflict with OptionSelected Event
    if (!this.matAutocomplete.isOpen) {
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
  }

  removeSkill(skill: Skill) {
    this.jobOffer.skills.splice(this.jobOffer.skills.indexOf(skill));
  }

  searchSkills(query: string) {
    console.log(query);
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
