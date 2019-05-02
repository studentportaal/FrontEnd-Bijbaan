import {Component, OnInit} from '@angular/core';
import {JobOffer} from '../../../domain/JobOffer';
import {JobofferService} from '../../../services/joboffer/joboffer.service';
import {MatDialog, PageEvent} from '@angular/material';
import {CompanyfilterdialogComponent} from '../companyfilterdialog/companyfilterdialog.component';
import {Company} from '../../../domain/Company';

@Component({
  selector: 'app-joboffer',
  templateUrl: './jobofferlist.component.html',
  styleUrls: ['./jobofferlist.component.scss']
})
export class JobofferlistComponent implements OnInit {

  private jobOffers: JobOffer[];
  companies: string[] = new Array();
  length: number;
  pageSize: number;
  pageIndex: number;
  pageEvent: PageEvent;

  constructor(private jobOfferService: JobofferService, private dialog: MatDialog) {
  }

  ngOnInit() {
    this.pageSize = 25;
    this.getServerData(null);
  }

  public openDialog() {
    const dialogRef = this.dialog.open(CompanyfilterdialogComponent, {
      data: {companies: this.companies}
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.companies = result;
      this.getServerData();
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
        }
      );
    });

    return event;
  }
}
