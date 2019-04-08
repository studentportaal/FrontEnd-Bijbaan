import { Component, OnInit } from '@angular/core';
import {JobOffer} from '../../../models/JobOffer';
import {JobofferService} from '../../../services/joboffer/joboffer.service';
import { ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-joboffer',
  templateUrl: './joboffer.component.html',
  styleUrls: ['./joboffer.component.scss']
})
export class JobofferComponent implements OnInit {
  private joboffer: JobOffer;

  constructor(private route: ActivatedRoute, private jobOfferService: JobofferService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.getJobOffer(id);
  }

  getJobOffer(id: String) {
    this.jobOfferService.getJobOffer(id).subscribe((offer) => this.joboffer = offer);
  }

}
