import { Component, computed, effect, input, output, signal, SimpleChanges } from '@angular/core';
import { Customer } from '../../domain/Customer';

@Component({
  selector: 'app-customer-list',
  standalone: true,
  imports: [],
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
