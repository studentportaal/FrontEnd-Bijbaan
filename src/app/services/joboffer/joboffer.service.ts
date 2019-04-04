import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JobOffer} from '../../models/JobOffer';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JobofferService {

  private jobOfferBaseUrl = 'http://localhost:9000/joboffer';
  constructor(private httpClient: HttpClient) { }

  getAllJobOffers(): Observable<JobOffer[]> {
    return this.httpClient.get<JobOffer[]>(this.jobOfferBaseUrl);
  }

  getJobOffer(id : String): Observable<JobOffer> {
    return this.httpClient.get<JobOffer>(this.jobOfferBaseUrl + '/' + id);
  }
}
