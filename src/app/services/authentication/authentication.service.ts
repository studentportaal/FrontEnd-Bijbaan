import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../domain/User';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public user: User;

  private baseUrl: string = environment.API_BASE + '/users'
  constructor(private httpClient: HttpClient) { }

  public login(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + '/login', user);
  }

  public setSession(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
    this.user = user;
  }

  public isLoggedIn() {
    return JSON.parse(localStorage.getItem('currentUser')) != null;
  }

  public checkCurrentUser(id: string) {
   return JSON.parse(localStorage.getItem('currentUser')).id === id;
  }
}
