import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../domain/Student';
import {environment} from '../../../environments/environment';
import {Company} from "../../domain/Company";
import {User} from "../../domain/User";
import {UserType} from "../../domain/UserType";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user: User;
  public userType: UserType;

  private baseUrlStudent: string = environment.API_BASE + '/users';
  private baseUrlCompany: string = environment.API_BASE + '/company';

  constructor(private httpClient: HttpClient) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userType = JSON.parse(localStorage.getItem('currentUserType'));

    if(user === null || user === undefined) {
      return;
    }

    this.user = user;
    this.userType = userType;
  }

  public loginAsStudent(student: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.baseUrlStudent + '/login', student);
  }

  public loginAsCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(this.baseUrlCompany + '/login', company);
  }

  public setSession(user: User, type: UserType) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    localStorage.setItem('currentUserType', JSON.stringify(type));

    this.user = user;
    this.userType = type;
  }

  public isLoggedIn() {
    return JSON.parse(localStorage.getItem('currentUser')) != null;
  }

  public checkCurrentUser(id: string) {
   return this.user.uuid === id;
  }

  public isStudent(): boolean {
    return this.userType === UserType.STUDENT;
  }

  public isCompany(): boolean {
    return this.userType === UserType.COMPANY;
  }

  public logout() {
    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserType')
  }
}
