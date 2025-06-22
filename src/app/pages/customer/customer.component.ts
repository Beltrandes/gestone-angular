import { AuthService } from './../../services/auth.service';
import { Component, inject, signal } from '@angular/core';
import { ControllerComponent } from '../../components/controller/controller.component';
import { CustomerListComponent } from '../../components/customer-list/customer-list.component';
import { Observable } from 'rxjs';
import { CustomerService } from '../../services/customer.service';
import { AsyncPipe } from '@angular/common';
import { CustomerFormComponent } from '../../components/customer-form/customer-form.component';
import { Customer } from '../../domain/Customer';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogComponent } from '../../components/delete-dialog/delete-dialog.component';

@Component({
  selector: 'app-customer',
  imports: [
    ControllerComponent,
    CustomerListComponent,
    AsyncPipe,
    CustomerFormComponent,
  ],
  templateUrl: './customer.component.html',
  styleUrl: './customer.component.sass'
})
export class CustomerComponent {
  customers$!: Observable<Customer[]>;
  marbleshopId: string | null = null;
  customerService = inject(CustomerService);
  authService = inject(AuthService);
  isCustomerFormOpened = signal<boolean>(false);
  isSaving = signal<boolean>(false);
  customerToDelete!: Customer;
  editingCustomer!: Customer;
  searchString = signal<string>('');
  private readonly _snackBar = inject(MatSnackBar);
  readonly dialog = inject(MatDialog)
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
    this.editingCustomer = {} as Customer;
    this.customerToDelete = {} as Customer;
  }

  openEditCustomerForm(customer: Customer) {
    this.closeAddCustomerForm()
    this.editingCustomer = customer;
    this.openAddCustomerForm();
  }

  openDialog() {
    const deleteDialogRef = this.dialog.open(DeleteDialogComponent, {
      data: {
        title: 'Confirmação de exclusão',
        message: `Você tem certeza que deseja excluir o(a) cliente ${this.customerToDelete.name}?`,
      }
    })
    deleteDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCustomer()
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  saveCustomer(customer: Customer) {
    this.customerService.saveCustomer(customer).subscribe({
      next: () => {
        this.isSaving.set(true);
      },
      error: () => {
        this.openSnackBar('Ocorreu um erro, cliente não registrado!', 'Fechar');
      },
      complete: () => {
        setTimeout(() => {
          this.closeAddCustomerForm();
          this.openSnackBar('Cliente registrado com sucesso!', 'Fechar');
          this.isSaving.set(false);
          this.loadCustomers();
        }, 2000);
      },
    });
  }

  deleteCustomer() {
    if (this.customerToDelete) {
      this.customerService
        .deleteCustomer(this.customerToDelete.id!)
        .subscribe({
          next: () => {
            this.loadCustomers();
          },
        });
    }
  }

  openConfirmationDeleteModal(customer: Customer) {
    this.customerToDelete = customer;
    this.openDialog()
  }

  searchCustomer(searchString: string) {
    this.searchString.set(searchString);
  }
}
