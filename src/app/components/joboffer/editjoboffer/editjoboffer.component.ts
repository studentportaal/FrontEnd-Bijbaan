import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {JobOffer} from '../../../domain/JobOffer';
import {ActivatedRoute, Router} from '@angular/router';
import {Company} from '../../../domain/Company';
import {JobofferService} from '../../../services/joboffer/joboffer.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-editjoboffer',
  templateUrl: './editjoboffer.component.html',
  styleUrls: ['./editjoboffer.component.scss']
})
export class EditjobofferComponent implements OnInit {

  @Input() joboffer: JobOffer;
  originalJobOffer: JobOffer;
  @Input() company: Company;
  @Output() editBoolean = new EventEmitter<boolean>();

  constructor(private activatedRoute: ActivatedRoute,
              private jobofferService: JobofferService,
              private snackBar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
    this.joboffer.company = this.company.uuid;
    this.jobofferService.getJobOffer(this.joboffer.id).subscribe(response => {
      this.joboffer = response;
      this.originalJobOffer = JSON.parse(JSON.stringify(response))
    });
  }

  edit() {
    for (const originalJobOfferKey in this.originalJobOffer) {
      if (this.joboffer[originalJobOfferKey] == null) {
        this.joboffer[originalJobOfferKey] = this.originalJobOffer[originalJobOfferKey];
      }
    }
    this.jobofferService.editJoboffer(this.joboffer).subscribe((response) => {
      const snackbarRef = this.snackBar.open('Job offer was edited', 'dismiss', {duration: 2000});

      snackbarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/joboffers');
      });
    });
  }

  cancel() {
    this.editBoolean.emit(false);
  }
}
