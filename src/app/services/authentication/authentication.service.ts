import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from '../../domain/Student';
import {environment} from '../../../environments/environment';
import {Company} from "../../domain/Company";
import {User} from "../../domain/User";
import {UserType} from "../../domain/UserType";
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user: User;
  public userType: UserType;
  private token: string;
  private jwtHelper: JwtHelperService = new JwtHelperService();

  private baseUrlStudent: string = environment.API_BASE + '/users';
  private baseUrlCompany: string = environment.API_BASE + '/company';
  private fontysAuthUrl: string = environment.FONTYS_AUTH;

  constructor(private httpClient: HttpClient) {
    const user = JSON.parse(localStorage.getItem('currentUser'));
    const userType = JSON.parse(localStorage.getItem('currentUserType'));
    if (user === null || user === undefined) {
      return;
    }
    this.user = user;
    this.userType = userType;
    this.token = localStorage.getItem('token');
  }

  public isExpired() {
    return this.jwtHelper.isTokenExpired(this.token);
  }

  public hasToken() {
    return (this.token != null);
  }

  public getToken() {
    return this.token;
  }

  public async refreshToken() {
    const token = this.jwtHelper.decodeToken(this.token);


    this.httpClient.get<string>(environment.API_BASE + '/auth/token/refresh?refreshKey=' + token['refreshKey'] + '&userId=' + token['sub']).subscribe(newToken => {
      localStorage.setItem('token', newToken);
      this.token = newToken;
    });
  }


  public loginAsStudent(student: Student): Observable<string> {
    return this.httpClient.post<string>(this.baseUrlStudent + '/login', student);
  }

  public loginAsCompany(company: Company): Observable<string> {
    return this.httpClient.post<string>(this.baseUrlCompany + '/login', company);
  }

  public fontysLogin(code: string): Observable<string> {
    return this.httpClient.get<string>(this.fontysAuthUrl + '/login?authorization=' + code);
  }

  public async setSession(token: string, type: UserType) {
    localStorage.setItem('token', token);
    this.token = token;
    localStorage.setItem('currentUserType', JSON.stringify(type));
    this.userType = type;
    await this.httpClient.get<User>(environment.API_BASE + '/auth/me').subscribe(me => {
      this.user = me;
      localStorage.setItem("currentUser", JSON.stringify(me));
    });
  }

  public checkCurrentUser(id: string) {
    return this.user.uuid === id;
  }

  public isLoggedIn() {
    return JSON.parse(localStorage.getItem('currentUser')) != null;
  }

  public isStudent(): boolean {
    return this.userType === UserType.STUDENT;
  }

  public isCompany(): boolean {
    return this.userType === UserType.COMPANY;
  }

  public async logout() {
    if (this.hasToken()) {
      const token = this.jwtHelper.decodeToken(this.token);
      await this.httpClient.delete(environment.API_BASE + '/auth/token/' + token['tokenId'])
        .toPromise()
        .then(res => {
          localStorage.removeItem('token');
        }).catch(e => {
          localStorage.removeItem('token');
        });
    }

    localStorage.removeItem('currentUser');
    localStorage.removeItem('currentUserType');
  }
}
