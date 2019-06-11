import { Component, OnInit, ViewChild } from '@angular/core';
import { JobOffer } from '../../../domain/JobOffer';
import { Company } from '../../../domain/Company';
import { Router } from '@angular/router';
import { JobofferService } from '../../../services/joboffer/joboffer.service';
import { MatDialog, PageEvent, MatSort } from '@angular/material';
import { CompanyFilterDialogComponent } from '../companyfilterdialog/companyfilterdialog.component';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { CompanyService } from '../../../services/company/company.service';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'app-jobofferlist',
  templateUrl: './jobofferlist.component.html',
  styleUrls: ['./jobofferlist.component.scss']
})
export class JobofferlistComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  jobOffers: JobOffer[];
  companies: string[] = [];
  companiesAsCompanies: Company[];
  length: number;
  pageSize: number;
  pageIndex: number;
  pageEvent: PageEvent;
  dataSource = new MatTableDataSource(this.jobOffers);
  isOwnJobOffers = false;

  constructor(private jobOfferService: JobofferService,
    private dialog: MatDialog,
    private authenticationService: AuthenticationService,
    private companyService: CompanyService,
    private router: Router) {
  }

  ngOnInit() {
    this.pageSize = 25;
    this.getServerData(null);
    this.getCompanies();
  }

  public getCompanies() {
    this.companyService.getAllCompanies().subscribe((response) => {
      // @ts-ignore
      this.companiesAsCompanies = response;
    });
  }

  public getServerData(event?: PageEvent) {
    this.jobOfferService.getJobOfferCount(this.companies).subscribe((response) => {
      this.length = +response;
      if (event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
      }
      this.jobOfferService.getAllJobOffers((Math.imul(this.pageSize, this.pageIndex)), this.pageSize, this.companies, true).subscribe(
        reply => {
          this.jobOffers = reply;
          this.dataSource = new MatTableDataSource(this.jobOffers);
          this.dataSource.sort = this.sort;
        }
      );
    });
    return event;
  }

  public getJobOffer(joboffer: string) {
    const url: string = '/joboffers/details/' + joboffer;
    this.router.navigateByUrl(url);
  }

  getCompanyName(id: any) {
    for (const comp of this.companiesAsCompanies) {
      if (comp.uuid === id) {
        return comp.name;
      }
    }
  }

  isWithinOneDay(topofday) {
    const date = new Date(topofday).getTime();
    const OneDay = new Date().getTime() - (1 * 24 * 60 * 60 * 1000);
    if (date > OneDay) {
      return true;
    }
    return false;
  }
}
