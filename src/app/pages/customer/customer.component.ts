import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ControllerComponent } from '../../components/controller/controller.component';
import { CustomerListComponent } from '../../components/customer-list/customer-list.component';
import { Observable } from 'rxjs';
import { CustomerResponse } from '../../types/CustomerResponse';
import { CustomerService } from '../../services/customer.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [NavbarComponent, ControllerComponent, CustomerListComponent, AsyncPipe],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.sass'
})
export class CustomerComponent {

  customers$!: Observable<CustomerResponse[]>
  marbleshopId: string | null = null
  constructor(
    private readonly customerService: CustomerService,
    private readonly authService: AuthService
  ) {
    this.marbleshopId = authService.getMarbleshopId()
    this.customers$ = customerService.getAllCustomersFromMarbleshop(this.marbleshopId)
  }
}
