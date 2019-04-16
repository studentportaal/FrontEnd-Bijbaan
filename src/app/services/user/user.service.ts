 import { Injectable } from '@angular/core';
 import { HttpClient } from '@angular/common/http';
 import { environment} from '../../../environments/environment';
 import { Student } from '../../domain/Student';
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

  public addUser(user: Student): Observable<Student> {
    return this.httpClient.post<Student>(this.baseUrl, user);
  }

   updateUser(user: Student) {
    console.log(user)
    return this.httpClient.put<Student>(this.baseUrl + '/' + user.uuid, user);
   }
 }
