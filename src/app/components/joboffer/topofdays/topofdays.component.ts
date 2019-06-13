import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/domain/JobOffer';
import { JobofferService } from 'src/app/services/joboffer/joboffer.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-topofdays',
  templateUrl: './topofdays.component.html',
  styleUrls: ['./topofdays.component.scss']
})
export class TopOfDaysComponent implements OnInit {

  topOfDayJobOffers: JobOffer[] = [];
  constructor(private jobOfferService: JobofferService,
              private router: Router) { }

  ngOnInit() {
    this.getAllTopOfDaysJobOffers();
  }

  public getAllTopOfDaysJobOffers() {
    this.jobOfferService.getAllTopOfDaysJobOffers().subscribe((response) => {
      this.topOfDayJobOffers = response;
    });
  }

  public getJobOffer(joboffer: string) {
    const url: string = '/joboffers/details/' + joboffer;
    this.router.navigateByUrl(url);
  }
}
