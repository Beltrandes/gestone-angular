import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { Customer } from '../domain/Customer';

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/customer';

  constructor(
    private readonly http: HttpClient,
    private readonly authService: AuthService
  ) { }

  getAllCustomersFromMarbleshop(
    marbleshopId: string | null
  ): Observable<Customer[]> {
    return this.http.get<Customer[]>(`${this.apiUrl}/${marbleshopId}`);
  }

  saveCustomer(customer: Customer) {
    if (customer.id) {
      return this.updateCustomer(customer);
    }
    return this.createCustomer(customer);
  }

  createCustomer(customer: Customer) {
    return this.http.post<Customer>(`${this.apiUrl}`, customer);
  }

  updateCustomer(customer: Customer) {
    return this.http.put<Customer>(`${this.apiUrl}/${customer.id}`, customer);
  }

  deleteCustomer(customerId: string) {
    return this.http.delete(`${this.apiUrl}/${customerId}`);
  }
}
