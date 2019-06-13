import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JobOffer} from '../../domain/JobOffer';
import {BehaviorSubject, Observable} from 'rxjs';
import {Student} from '../../domain/Student';
import {environment} from '../../../environments/environment';
import {Skill} from "../../domain/Skill";
import {Application} from "../../domain/Application";

@Injectable({
  providedIn: 'root'
})
export class JobofferService {


  private jobOfferBaseUrl = environment.API_BASE + '/joboffer';
  jobOfferSource = new BehaviorSubject<JobOffer>(null);
  currentJobOffer = this.jobOfferSource.asObservable();

  constructor(private httpClient: HttpClient) {
  }

  getAllJobOffers(startNr: number, amount: number, companies: string[], isOpen: boolean, skills: string[], title: string): Observable<JobOffer[]> {
    return this.httpClient.get<JobOffer[]>(this.jobOfferBaseUrl + `?startNr=${startNr}&amount=${amount}&companies=${companies.toString()}&open=${isOpen}&skills=${skills.toString()}&title=${title}`);
  }

  getAllTopOfDaysJobOffers() {
    return this.httpClient.get<JobOffer[]>(this.jobOfferBaseUrl + '/topofday/all');
  }

  getJobOffer(id: string): Observable<JobOffer> {
    return this.httpClient.get<JobOffer>(this.jobOfferBaseUrl + '/' + id);
  }

  getJobOfferCount(companies: string[], isOpen: boolean, skills: string[], title: string) {
    return this.httpClient.get<string>(this.jobOfferBaseUrl + '/all/count' + `?&companies=${companies.toString()}&open=${isOpen}&skills=${skills.toString()}&title=${title}`);
  }

  addJobOffer(jobOffer: JobOffer) {
    jobOffer.isOpen = true;
    return this.httpClient.post<JobOffer>(this.jobOfferBaseUrl, jobOffer);
  }

  applyForJob(a: Application, id: string) {
    return this.httpClient.patch(this.jobOfferBaseUrl + '/' + id, a);
  }

  acceptApplicant(jobOfferId: string, applicationId: string) {
    return this.httpClient.patch(`${this.jobOfferBaseUrl}/${jobOfferId}/applications/${applicationId}`, undefined);
  }

  setSkills(skills: Skill[], id: string) {
    const obj = {
      "skills": skills
    };

    return this.httpClient.patch(this.jobOfferBaseUrl + '/' + id + '/skills', obj);
  }

  editJoboffer(jobOffer: JobOffer): Observable<JobOffer> {
    const newJobOffer = {
      "salary": jobOffer.salary,
      "id": jobOffer.id,
      "location": jobOffer.location,
      "title": jobOffer.title,
      "information": jobOffer.information,
      "function": jobOffer.function,
      "skills": jobOffer.skills,
      "topOfTheDay": jobOffer.topOfTheDay,
      "isOpen": jobOffer.isOpen
    };
    return this.httpClient.put<JobOffer>(this.jobOfferBaseUrl + '/' + jobOffer.id, newJobOffer);
  }

  changeCurrentJobOffer(jobOffer: JobOffer) {
    this.jobOfferSource.next(jobOffer);
  }
}
