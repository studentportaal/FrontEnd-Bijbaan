import { Component, OnInit } from '@angular/core';
import { JobOffer } from 'src/app/domain/JobOffer';
import { JobofferService } from 'src/app/services/joboffer/joboffer.service';
import {Router} from "@angular/router";
import {Company} from "../../../domain/Company";
import {CompanyService} from "../../../services/company/company.service";

@Component({
  selector: 'app-topofdays',
  templateUrl: './topofdays.component.html',
  styleUrls: ['./topofdays.component.scss']
})
export class TopOfDaysComponent implements OnInit {

  topOfDayJobOffers: JobOffer[] = [];
  companies: Company[] = [];

  constructor(private jobOfferService: JobofferService,
              public companyService: CompanyService,
              private router: Router) { }

  ngOnInit() {
    this.getAllTopOfDaysJobOffers();
  }

  public getAllTopOfDaysJobOffers() {
    this.jobOfferService.getAllTopOfDaysJobOffers().subscribe((response) => {
      this.topOfDayJobOffers = response;
    });

    this.companyService.getAllCompanies().subscribe ( (response) => {
      this.companies = response;
    });
  }

  public getJobOffer(joboffer: string) {
    const url: string = '/joboffers/details/' + joboffer;
    this.router.navigateByUrl(url);
  }

  public getCompanyName(id: string): Company {
    if (this.companies.length > 0 ) {
      return this.companies.find(x => x.uuid === id);
    }
    return null;
  }
}
