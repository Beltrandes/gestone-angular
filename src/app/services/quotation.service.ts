import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Quotation } from '../domain/Quotation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class QuotationService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/quotation';
  constructor() { }

  http = inject(HttpClient);

  getAllQuotationFromMarbleshop(
    marbleshopId: string | null
  ): Observable<Quotation[]> {
    return this.http.get<Quotation[]>(`${this.apiUrl}/${marbleshopId}`);
  }

  getQuotationById(quotationId: string): Observable<Quotation> {
    return this.http.get<Quotation>(`${this.apiUrl}/${quotationId}`);
  }

  saveQuotation(quotation: Quotation) {
    if (quotation.id) {
      return this.updateQuotation(quotation)
    }
    return this.createQuotation(quotation)
  }

  createQuotation(quotation: Quotation) {
    return this.http.post<Quotation>(`${this.apiUrl}`, quotation)
  }

  updateQuotation(quotation: Quotation) {
    return this.http.put<Quotation>(`${this.apiUrl}/${quotation.id}`, quotation)
  }

  generateQuotationPdf(quotationId: string) {
    return this.http.get(`${this.apiUrl}/pdf/${quotationId}`, {
      responseType: 'blob'
    })
  }
}
