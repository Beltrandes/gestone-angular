import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CustomerResponse } from '../types/CustomerResponse';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/customer'

  constructor(private readonly http: HttpClient, private readonly authService: AuthService) {
  }

  getAllCustomersFromMarbleshop(marbleshopId: string | null): Observable<CustomerResponse[]> {
    const token = this.authService.getToken()
    if (!token) {
      throw new Error('Token not found')
    }
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    return this.http.get<CustomerResponse[]>(`${this.apiUrl}/${marbleshopId}`, { headers })
  }
}
