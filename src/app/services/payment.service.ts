import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Payment } from '../domain/Payment';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
private readonly apiUrl = 'http://localhost:8080/api/v1/payment'

  constructor() { }

  http = inject(HttpClient)

  getAllPaymentFromMarbleshop(marbleshopId: string | null) {
    return this.http.get<Payment[]>(`${this.apiUrl}/${marbleshopId}`)
  }

  savePayment(payment: Payment) {
    if (payment.id) {
      return this.updatePayment(payment)
    } else {
      return this.createPayment(payment)
    }
  }

  private createPayment(payment: Payment) {
    return this.http.post<Payment>(this.apiUrl, payment)
  }

  private updatePayment(payment: Payment) {
    return this.http.put<Payment>(`${this.apiUrl}/${payment.id}`, payment)
  }
}
