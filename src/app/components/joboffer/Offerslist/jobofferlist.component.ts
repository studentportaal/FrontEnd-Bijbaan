import {Component, OnInit} from '@angular/core';
import {JobOffer} from '../../../domain/JobOffer';
import {JobofferService} from '../../../services/joboffer/joboffer.service';
import {MatDialog, PageEvent} from '@angular/material';
import {CompanyfilterdialogComponent} from '../companyfilterdialog/companyfilterdialog.component';

@Component({
  selector: 'app-joboffer',
  templateUrl: './jobofferlist.component.html',
  styleUrls: ['./jobofferlist.component.scss']
})
export class JobofferlistComponent implements OnInit {

  private jobOffers: JobOffer[];
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
    });

    dialogRef.afterClosed().subscribe((result) => {
    });
  }

  public getServerData(event?: PageEvent) {
    this.jobOfferService.getJobOfferCount().subscribe((response) => {
      this.length = +response;
      if (event) {
        this.pageSize = event.pageSize;
        this.pageIndex = event.pageIndex;
      }
      this.jobOfferService.getAllJobOffers((Math.imul(this.pageSize, this.pageIndex)), this.pageSize).subscribe(
        reply => {
          this.jobOffers = reply;
        }
      );
    });

    return event;
  }
}
