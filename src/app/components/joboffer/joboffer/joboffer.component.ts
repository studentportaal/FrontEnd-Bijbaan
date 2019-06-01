import {Component, OnInit, Output} from '@angular/core';
import {JobofferService} from '../../../services/joboffer/joboffer.service';
import { ActivatedRoute } from '@angular/router';
import {CompanyService} from '../../../services/company/company.service';
import {Company} from '../../../domain/Company';
import {JobOffer} from '../../../domain/JobOffer';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {MatDialog, MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-joboffer',
  templateUrl: './joboffer.component.html',
  styleUrls: ['./joboffer.component.scss']
})
export class JobofferComponent implements OnInit {

  joboffer: JobOffer;
  editBoolean = false;
  paymentBoolean = false;
  private company: Company;

  constructor(private route: ActivatedRoute,
              private jobOfferService: JobofferService,
              private companyService: CompanyService,
              private authenticationService: AuthenticationService,
              private snackbar: MatSnackBar) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getJobOffer(id);
  }

  getJobOffer(id: string) {
    this.jobOfferService.getJobOffer(id).subscribe(offer => {
      this.joboffer = offer;
      this.companyService.getCompany(offer.company).subscribe(company => this.company = company);
    });
  }

  edit() {
    this.editBoolean = true;
  }

  pay() {
    this.paymentBoolean = true;
  }

  receiveBoolean($boolean) {
    this.editBoolean = $boolean;
  }

  receivePaymentBoolean($boolean) {
    this.paymentBoolean = $boolean;
  }

  alreadyApplied(): boolean {
    if (this.joboffer.applications.length === 0) {
      return false;
    }

    let hasApplied = false;
    this.joboffer.applications.forEach((application) => {
      if (application.applicant.uuid === this.authenticationService.user.uuid) {
        hasApplied = true;
      }
    });

    return hasApplied;
  }

  acceptApplication(applicationId: string) {
    this.jobOfferService.acceptApplicant(this.joboffer.id, applicationId).subscribe((response) => {
      const snackbarRef = this.snackbar.open('Applicant accepted', 'dismiss', {
        duration: 1500});
    });
  }

}
