import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../domain/User';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private baseUrl: string = environment.API_BASE + '/users'
  constructor(private httpClient: HttpClient) { }

  public login(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl + '/login', user);
  }

  public setSession(user: User) {
    localStorage.setItem('currentUser', JSON.stringify(user));
  }

  public isLoggedIn() {
    if (JSON.parse(localStorage.getItem('currentUser')) != null) {
      return false;
    }
    return true;
  }

  public checkCurrentUser(id: string) {
   if (JSON.parse(localStorage.getItem('currentUser')).id === id) {
     return true;
   }
   return false;
  }
}
