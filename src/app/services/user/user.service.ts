import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  private getUserByIdUrl: string = 'http://localhost:9000/users';

  constructor(private httpClient: HttpClient) { }

  public getUserById(id: any){
    const url = `${this.getUserByIdUrl}/${id}`;
    return this.httpClient.get<any>(url);
  }
}
