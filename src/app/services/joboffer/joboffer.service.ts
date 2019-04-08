import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JobOffer} from '../../models/JobOffer';
import {Observable} from 'rxjs';
import {User} from '../../domain/User';

@Injectable({
  providedIn: 'root'
})
export class JobofferService {

  private jobOfferBaseUrl = 'http://localhost:9000/joboffer';

  constructor(private httpClient: HttpClient) {
  }

  getAllJobOffers(startNr: number, amount: number): Observable<JobOffer[]> {
    return this.httpClient.get<JobOffer[]>(this.jobOfferBaseUrl + `?startNr=${startNr}&amount=${amount}`);
  }

  getJobOffer(id: string): Observable<JobOffer> {
    return this.httpClient.get<JobOffer>(this.jobOfferBaseUrl + '/' + id);
  }

  getJobOfferCount() {
    return this.httpClient.get<string>(this.jobOfferBaseUrl + '/all/count');
  }

  applyForJob(u: User, id: string) {
    return this.httpClient.put(this.jobOfferBaseUrl + '/' + id, u);
  }
}
