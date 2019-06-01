import { Injectable } from '@angular/core';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Transaction} from '../../domain/Transaction';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  private paymentURL = environment.API_PAYMENT + '/payment'

  constructor(private httpClient: HttpClient) { }

  createToken(): Observable<string> {
    return this.httpClient.get(this.paymentURL + '/token/new', {responseType: 'text'});
  }

  pay(transaction: Transaction): Observable<Transaction> {
    return this.httpClient.post<Transaction>(this.paymentURL + '/transaction', transaction);
  }

}

