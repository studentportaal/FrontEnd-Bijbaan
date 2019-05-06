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

  getAllJobOffers(startNr: number, amount: number, companies: string[]): Observable<JobOffer[]> {
    if (companies !== undefined) {
      return this.httpClient.get<JobOffer[]>(this.jobOfferBaseUrl + `?startNr=${startNr}&amount=${amount}&companies=${companies.toString()}`);
    }
    return this.httpClient.get<JobOffer[]>(this.jobOfferBaseUrl + `?startNr=${startNr}&amount=${amount}`);
  }

  getJobOffer(id: string): Observable<JobOffer> {
    return this.httpClient.get<JobOffer>(this.jobOfferBaseUrl + '/' + id);
  }

  getJobOfferCount() {
    return this.httpClient.get<string>(this.jobOfferBaseUrl + '/all/count');
  }

  addJobOffer(jobOffer: JobOffer) {
    return this.httpClient.post<JobOffer>(this.jobOfferBaseUrl, jobOffer);
  }

  applyForJob(u: Student, id: string) {
    return this.httpClient.patch(this.jobOfferBaseUrl + '/' + id, u);
  }

  editJoboffer(jobOffer: JobOffer): Observable<JobOffer> {
    const newJobOffer = {
      "salary": jobOffer.salary,
      "id": jobOffer.id,
      "location": jobOffer.location,
      "title": jobOffer.title,
      "information": jobOffer.information,
      "function": jobOffer.function
    };
    return this.httpClient.put<JobOffer>(this.jobOfferBaseUrl + '/' + jobOffer.id, newJobOffer);
  }
}
