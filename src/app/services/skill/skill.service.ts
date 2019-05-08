import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Skill} from "../../domain/Skill";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SkillService {

  private baseUrl: string = environment.API_BASE + '/skills';

  constructor(private httpClient: HttpClient) { }

  public add(skill: Skill): Observable<Skill> {
    return this.httpClient.post<Skill>(this.baseUrl, skill);
  }

  public get(): Observable<Skill[]> {
    return this.httpClient.get<Skill[]>(this.baseUrl);
  }

  public search(q: string): Observable<Skill[]> {
    let params = new HttpParams();
    params = params.append("query", q);
    return this.httpClient.get<Skill[]>(this.baseUrl, { params });
  }

}
