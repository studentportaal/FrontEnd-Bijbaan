 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
 import { environment} from '../../../environments/environment';
 import { User } from '../../domain/User';
 import {Observable} from 'rxjs';

 @Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl: string = environment.API_BASE + '/users';

  constructor(private httpClient: HttpClient) { }

  public getUserById(id: any) {
    const url = `${this.baseUrl}/${id}`;
    return this.httpClient.get<any>(url);
  }

  public addUser(user: User): Observable<User> {
    return this.httpClient.post<User>(this.baseUrl, user);
  }

   updateUser(user: User) {
    console.log(user)
    return this.httpClient.put<User>(this.baseUrl + '/' + user.uuid, user);
   }
 }
