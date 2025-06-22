import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Order } from '../domain/Order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private readonly apiUrl = 'http://localhost:8080/api/v1/order'

  constructor() { }

  http = inject(HttpClient)

  getAllOrderFromMarbleshop(marbleshopId: string | null) {
    return this.http.get<Order[]>(`${this.apiUrl}/${marbleshopId}`)
  }

  saveOrder(order: Order) {
    if (order.id) {
      return this.updateOrder(order)
    } else {
      return this.createOrder(order)
    }
  }

  private createOrder(order: Order) {
    return this.http.post<Order>(this.apiUrl, order)
  }

  private updateOrder(order: Order) {
    return this.http.put<Order>(`${this.apiUrl}/${order.id}`, order)
  }

  generateOrderPdf(orderId: string) {
    return this.http.get(`${this.apiUrl}/pdf/${orderId}`, {
      responseType: 'blob'
    })
  }

}
