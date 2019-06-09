import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/domain/JobOffer';
import { JobofferService } from 'src/app/services/joboffer/joboffer.service';

@Component({
  selector: 'app-topofdays',
  templateUrl: './topofdays.component.html',
  styleUrls: ['./topofdays.component.scss']
})
export class TopofdaysComponent implements OnInit {

  topOfDayJobOffers: JobOffer[] = [];

  constructor(private jobOfferService: JobofferService) { }

  ngOnInit() {
    this.getAllTopOfDaysJobOffers();
    setInterval(() => this.getAllTopOfDaysJobOffers(), 20000);
  }

  public getAllTopOfDaysJobOffers() {
    this.jobOfferService.getAllTopOfDaysJobOffers().subscribe((response) => {
      this.topOfDayJobOffers = response;
    });
  }

}
