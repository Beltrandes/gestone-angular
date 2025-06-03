import { Component, computed, input, output } from '@angular/core';
import { Customer } from '../../domain/Customer';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [MatMenuModule, MatCardModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './customer-list.component.html',
  styleUrl: './customer-list.component.sass',
})
export class CustomerListComponent {
  customers = input<Customer[]>();
  searchString = input<string>();

  delete = output<Customer>();
  edit = output<Customer>();

  filteredCustomers = computed(() => {
    const searchTerm = (this.searchString() ?? '').toLowerCase();
    let fiteredList = this.customers()!!.filter(customer => customer.name?.toLowerCase().includes(searchTerm!!) || customer.phone?.includes(searchTerm!!))
    return fiteredList
  })

  emitDelete(customer: Customer) {
    this.delete.emit(customer);
  }

  emitEdit(customer: Customer) {
    this.edit.emit(customer);
  }
}
