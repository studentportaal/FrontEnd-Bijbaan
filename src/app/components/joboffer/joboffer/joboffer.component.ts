import {Component, OnInit, Output} from '@angular/core';
import {JobofferService} from '../../../services/joboffer/joboffer.service';
import {ActivatedRoute, Router} from '@angular/router';
import {CompanyService} from '../../../services/company/company.service';
import {Company} from '../../../domain/Company';
import {JobOffer} from '../../../domain/JobOffer';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {MatDialog, MatSnackBar} from "@angular/material";
import {NotificationService} from "../../../services/notification/notification.service";
import {Application} from "../../../domain/Application";
import {CvService} from "../../../services/cvs/cv.service";

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
              private cvService: CvService,
              private snackbar: MatSnackBar,
              private notificationService: NotificationService,
              private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getJobOffer(id);
  }

  getJobOffer(id: string) {
    this.jobOfferService.getJobOffer(id).subscribe(offer => {
      this.joboffer = offer;
      this.addCvsToApplicants();
      this.companyService.getCompany(offer.company).subscribe(company => this.company = company);
    });
  }

  async addCvsToApplicants() {
    for (const application of this.joboffer.applications) {
      this.cvService.getCvForApplication(this.joboffer.id, application.applicant.uuid).subscribe(url => {
        application.cvDownloadUrl = url;
      });
    }
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
    if (!this.joboffer || this.joboffer.applications.length === 0) {
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
    this.notificationService.createNotification(this.joboffer).subscribe((response) => {
    });
    this.router.navigateByUrl(`/users/${this.authenticationService.user.uuid}/joboffers`);
  }

}
