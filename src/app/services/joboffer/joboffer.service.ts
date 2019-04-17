import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JobOffer} from '../../domain/JobOffer';
import {Observable} from 'rxjs';
import {Student} from '../../domain/Student';

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

  applyForJob(u: Student, id: string) {
    console.log(u);
    return this.httpClient.put(this.jobOfferBaseUrl + '/' + id, u);
  }
}
