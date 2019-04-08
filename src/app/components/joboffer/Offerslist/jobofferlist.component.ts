import {Component, OnInit} from '@angular/core';
import {JobOffer} from '../../../models/JobOffer';
import {JobofferService} from '../../../services/joboffer/joboffer.service';
import {PageEvent} from '@angular/material';

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

  constructor(private jobOfferService: JobofferService) {
  }

  ngOnInit() {
    this.pageSize = 25;
    this.getServerData(null);
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
