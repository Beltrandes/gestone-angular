import { AuthService } from './../../services/auth.service';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ControllerComponent } from '../../components/controller/controller.component';
import { CustomerListComponent } from '../../components/customer-list/customer-list.component';
import { Observable } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { AsyncPipe } from '@angular/common';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { Customer } from '../../domain/Customer';
import { ToastrService } from 'ngx-toastr';
import { ModalComponent } from '../../components/modal/modal.component';

@Component({
  selector: 'app-customer',
  standalone: true,
  imports: [
    NavbarComponent,
    ControllerComponent,
    CustomerListComponent,
    AsyncPipe,
    CustomerFormComponent,
    ModalComponent,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.sass',
})
export class CustomerComponent {
  customers$!: Observable<Customer[]>;
  marbleshopId: string | null = null;
  customerService = inject(CustomerService);
  authService = inject(AuthService);
  toastr = inject(ToastrService);
  isCustomerFormOpened = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  customerToDelete!: Customer;
  editingCustomer!: Customer;
  searchString = signal<string>('');
  @ViewChild(ModalComponent) modal?: ModalComponent;
  constructor() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.marbleshopId = this.authService.getMarbleshopId();
    this.customers$ = this.customerService.getAllCustomersFromMarbleshop(
      this.marbleshopId
    );
  }

  openAddCustomerForm() {
    this.isCustomerFormOpened.set(true);
  }
  closeAddCustomerForm() {
    this.isCustomerFormOpened.set(false);
  }

  openEditCustomerForm(customer: Customer) {
    this.editingCustomer = customer;
    this.openAddCustomerForm();
  }

  saveCustomer(customer: Customer) {
    this.customerService.saveCustomer(customer).subscribe({
      next: () => {
        this.isSaving.set(true);
      },
      error: () => {
        this.toastr.error(
          'Ocorreu um erro, tente novamente mais tarde',
          'Mensagem do sistema'
        );
      },
      complete: () => {
        setTimeout(() => {
          this.closeAddCustomerForm();
          this.toastr.success(
            'Cliente registado com sucesso!',
            'Mensagem do sistema'
          );
          this.isSaving.set(false);
          this.loadCustomers();
        }, 2000);
      },
    });
  }

  deleteCustomer() {
    if (this.customerToDelete) {
      this.customerService
        .deleteCustomer(this.customerToDelete.id!!)
        .subscribe({
          next: () => {
            this.modal?.closeModal();
            this.loadCustomers();
          },
        });
    }
  }

  openConfirmationDeleteModal(customer: Customer) {
    this.customerToDelete = customer;
    this.modal?.openModal('Deseja mesmo fazer isso?');
  }

  searchCustomer(searchString: string) {
    this.searchString.set(searchString);
  }
}
