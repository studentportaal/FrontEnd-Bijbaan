import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JobOffer} from '../../models/JobOffer';
import {Observable} from 'rxjs';

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

  getJobOfferCount() {
    return this.httpClient.get<string>(this.jobOfferBaseUrl+ '/count');
  }

}
