import { Component, OnInit } from '@angular/core';
import {JobofferService} from '../../../services/joboffer/joboffer.service';
import { ActivatedRoute } from '@angular/router'
import { JobOffer } from 'src/app/domain/JobOffer';

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

  getJobOffer(id: string) {
    this.jobOfferService.getJobOffer(id).subscribe((offer) => this.joboffer = offer);
  }

}
