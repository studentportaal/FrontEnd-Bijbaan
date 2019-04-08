import { Component, OnInit } from '@angular/core';
import {JobOffer} from "../../../models/JobOffer";
import {JobofferService} from "../../../services/joboffer/joboffer.service";
import { ActivatedRoute } from '@angular/router'
import {CompanyService} from "../../../services/company/company.service";
import {Company} from "../../../models/Company";

@Component({
  selector: 'app-joboffer',
  templateUrl: './joboffer.component.html',
  styleUrls: ['./joboffer.component.scss']
})
export class JobofferComponent implements OnInit {
  private joboffer: JobOffer;
  private company: Company;

  constructor(private route: ActivatedRoute, private jobOfferService: JobofferService, private companyService: CompanyService) { }

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

}
