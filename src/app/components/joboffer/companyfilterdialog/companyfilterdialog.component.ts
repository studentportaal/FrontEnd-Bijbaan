import { Component, OnInit } from '@angular/core';
import {CompanyService} from "../../../services/company/company.service";
import {Company} from '../../../domain/Company';
import {PageEvent} from "@angular/material";

@Component({
  selector: 'app-companyfilterdialog',
  templateUrl: './companyfilterdialog.component.html',
  styleUrls: ['./companyfilterdialog.component.scss']
})
export class CompanyfilterdialogComponent implements OnInit {

  private companyList: Company[];
  length: number;
  pageSize: number;
  pageIndex: number;
  pageEvent: PageEvent;

  constructor(private companyService: CompanyService) { }

  ngOnInit() {
    this.companyService.getAllCompanies().subscribe((response) => {
      this.companyList = response;
    });
  }
  //
  // public getServerData(event?: PageEvent) {
  //   this.jobOfferService.getJobOfferCount().subscribe((response) => {
  //     this.length = +response;
  //     if (event) {
  //       this.pageSize = event.pageSize;
  //       this.pageIndex = event.pageIndex;
  //     }
  //     this.jobOfferService.getAllJobOffers((Math.imul(this.pageSize, this.pageIndex)), this.pageSize).subscribe(
  //       reply => {
  //         this.jobOffers = reply;
  //       }
  //     );
  //   });
  //
  //   return event;
  // }

}
