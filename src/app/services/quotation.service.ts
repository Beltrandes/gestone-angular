import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Quotation } from '../domain/Quotation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/quotation';
  constructor() {}

  http = inject(HttpClient);

  getAllQuotationFromMarbleshop(
    marbleshopId: string | null
  ): Observable<Quotation[]> {
    return this.http.get<Quotation[]>(`${this.apiUrl}/${marbleshopId}`);
  }
}
