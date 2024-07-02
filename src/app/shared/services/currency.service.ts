import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExchangeRates } from '../interfaces/exchange-rates';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private apiUrl = 'https://api.exchangerate-api.com/v4/latest/UAH';

  public constructor(private http: HttpClient) {}

  public getRates(): Observable<ExchangeRates> {
    return this.http.get<ExchangeRates>(this.apiUrl);
  }
}
