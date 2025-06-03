import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Bill } from '../domain/Bill';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  private readonly apiUrl = 'http://localhost:8080/api/v1/bill'

    constructor() { }

    http = inject(HttpClient)

    getAllBillFromMarbleshop(marbleshopId: string | null) {
      return this.http.get<Bill[]>(`${this.apiUrl}/${marbleshopId}`)
    }

    saveBill(bill: Bill) {
      if (bill.id) {
        return this.updateBill(bill)
      } else {
        return this.createBill(bill)
      }
    }

    private createBill(bill: Bill) {
      return this.http.post<Bill>(this.apiUrl, bill)
    }

    private updateBill(bill: Bill) {
      return this.http.put<Bill>(`${this.apiUrl}/${bill.id}`, bill)
    }
}
