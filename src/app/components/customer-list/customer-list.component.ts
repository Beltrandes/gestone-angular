import { Component, input } from '@angular/core';
import { CustomerResponse } from '../../types/CustomerResponse';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.sass'
})
export class CustomerListComponent {
  customers = input<CustomerResponse[]>()
}
