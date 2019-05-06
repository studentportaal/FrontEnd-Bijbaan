import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/domain/JobOffer';
import { JobofferService } from 'src/app/services/joboffer/joboffer.service';
import { MatGridTileHeaderCssMatStyler, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Company } from 'src/app/domain/Company';
import { CompanyComponent } from '../../general/company/company/company.component';

@Component({
  selector: 'app-addjoboffer',
  templateUrl: './addjoboffer.component.html',
  styleUrls: ['./addjoboffer.component.scss']
})
export class AddjobofferComponent implements OnInit {

  jobOffer: JobOffer = new JobOffer();
  currentCompany: Company;


  constructor(private jobOfferService: JobofferService,
              private authenticationService: AuthenticationService,
              private snackbar: MatSnackBar,
              private router: Router) {

  }

  ngOnInit() {
    if (this.authenticationService.isLoggedIn() && this.authenticationService.isCompany()) {
      this.currentCompany = this.authenticationService.user as Company;
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


}
