import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Company} from '../../models/Company';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companyBaseURL = 'http://localhost:9000/company';

  constructor(private httpClient: HttpClient) {
  }

  getCompany(id : String): Observable<Company> {
    return this.httpClient.get<Company>(this.companyBaseURL + '/' + id);
  }

}
