import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../../domain/Company';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyBaseURL = environment.API_BASE + '/company';

  constructor(private httpClient: HttpClient) {
  }

  addComapny(company: Company) {
    return this.httpClient.post(this.companyBaseURL, company);
  }

  getCompany(id: string): Observable<Company> {
    return this.httpClient.get<Company>(this.companyBaseURL + '/' + id);
  }

  getAllCompanies(): Observable<Company> {
    return this.httpClient.get<Company>(this.companyBaseURL);
  }

}
