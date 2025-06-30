import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ProductionOrder } from '../domain/ProductionOrder';

@Injectable({
  providedIn: 'root'
})
export class ProductionOrderService {

  private readonly apiUrl = 'http://localhost:8080/api/v1/production'

  constructor() { }

  http = inject(HttpClient)

  getAllProductionOrderFromMarbleshop(marbleshopId: string | null) {
    return this.http.get<ProductionOrder[]>(`${this.apiUrl}/${marbleshopId}`)
  }

  saveOrder(productionOrder: ProductionOrder) {
    if (productionOrder.id) {
      return this.updateOrder(productionOrder)
    } else {
      return this.createOrder(productionOrder)
    }
  }

  private createOrder(productionOrder: ProductionOrder) {
    return this.http.post<ProductionOrder>(this.apiUrl, productionOrder)
  }

  private updateOrder(productionOrder: ProductionOrder) {
    return this.http.put<ProductionOrder>(`${this.apiUrl}/${productionOrder.id}`, productionOrder)
  }

  generateOrderPdf(productionOrderId: string) {
    return this.http.get(`${this.apiUrl}/pdf/${productionOrderId}`, {
      responseType: 'blob'
    })
  }
}
