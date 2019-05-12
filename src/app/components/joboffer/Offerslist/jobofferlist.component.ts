import { Component, OnInit, ViewChild } from '@angular/core';
import { JobOffer } from '../../../domain/JobOffer';
import { Company } from '../../../domain/Company';
import { Router } from '@angular/router';
import { JobofferService } from '../../../services/joboffer/joboffer.service';
import { MatDialog, MatSortable, PageEvent, MatSort, MatSortModule } from '@angular/material';
import { CompanyFilterDialogComponent } from '../companyfilterdialog/companyfilterdialog.component';
import { AuthenticationService } from '../../../services/authentication/authentication.service';
import { CompanyService } from '../../../services/company/company.service';
import { MatTableDataSource} from '@angular/material';

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

  public openDialog() {
    const dialogRef = this.dialog.open(CompanyFilterDialogComponent, {
      data: { companies: this.companies },
      maxHeight: '750px',
      minWidth: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.companies = result;
      this.getServerData();
    });
  }

  public getCompanies() {
    this.companyService.getAllCompanies().subscribe((response) => {
      // @ts-ignore
      this.companiesAsCompanies = response;
    });
  }

  public getServerData(event?: PageEvent) {
    this.jobOfferService.getJobOfferCount().subscribe((response) => {
      this.length = +response;
      if (event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
      }
      this.jobOfferService.getAllJobOffers((Math.imul(this.pageSize, this.pageIndex)), this.pageSize, this.companies).subscribe(
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
    for (let comp of this.companiesAsCompanies) {
      if (comp.uuid == id) {
        return comp.name;
      }
    }
  }
}
