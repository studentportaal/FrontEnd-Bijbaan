import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Review} from "../../domain/Review";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  private baseUrl = environment.REVIEW_BASE;

  constructor(private http: HttpClient) { }

  public getReviews(target: string, author: string, written: boolean): Observable<Review[]> {
    const url = `${this.baseUrl}/getReviews?target=${target}&author=${author}&written=${written}`;

    return this.http.get<Review[]>(url);
  }

  public updateReview(review: Review): Observable<any> {
    const url = `${this.baseUrl}/updateReview`;
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');

    return this.http.put(url, {body: review});
  }
}
