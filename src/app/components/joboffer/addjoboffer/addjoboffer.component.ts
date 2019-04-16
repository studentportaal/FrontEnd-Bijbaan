import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/domain/JobOffer';
import { JobofferService } from 'src/app/services/joboffer/joboffer.service';
import { MatGridTileHeaderCssMatStyler, MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';

@Component({
  selector: 'app-addjoboffer',
  templateUrl: './addjoboffer.component.html',
  styleUrls: ['./addjoboffer.component.scss']
})
export class AddjobofferComponent implements OnInit {

  jobOffer: JobOffer = new JobOffer();

  constructor(private jobOfferService: JobofferService,
              private snackbar: MatSnackBar,
              private router: Router) {

  }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.jobOffer);
    // this.jobOfferService.addJobOffer(this.jobOffer).subscribe((response: JobOffer) => {
    //     const snackbarRef = this.snackbar.open('Job Offer successfully created','dismiss', {
    //       duration: 300
    //     });

    //     snackbarRef.afterDismissed().subscribe(() => {
    //       this.router.navigateByUrl('/');
    //     });
    // });
  }


}
