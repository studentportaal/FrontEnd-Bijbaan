import {Component, OnInit} from '@angular/core';
import {JobOffer} from '../../../models/JobOffer';
import {JobofferService} from '../../../services/joboffer/joboffer.service';

@Component({
  selector: 'app-joboffer',
  templateUrl: './jobofferlist.component.html',
  styleUrls: ['./jobofferlist.component.sass']
})
export class JobofferlistComponent implements OnInit {

  private jobOffers: JobOffer[];

  constructor(private jobOfferService: JobofferService) {
  }

  ngOnInit() {
    this.getAllJobOffers();
  }

  getAllJobOffers() {
    this.jobOfferService.getAllJobOffers().subscribe((offers) => this.jobOffers = offers);
  }
}
