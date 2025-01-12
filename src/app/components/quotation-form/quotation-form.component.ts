import { Component, inject, input } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { CustomerService } from '../../services/customer.service';
import { AuthService } from '../../services/auth.service';
import { Customer } from '../../domain/Customer';

@Component({
  selector: 'app-quotation-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './quotation-form.component.html',
  styleUrl: './quotation-form.component.sass',
})
export class QuotationFormComponent {
  isSaving = input(false);
  customers!: Customer[]
  quotationForm: FormGroup;
  authService = inject(AuthService)
  fb = inject(FormBuilder);
  customerService = inject(CustomerService)
  constructor() {
    this.quotationForm = this.fb.group({
      id: [''],
      name: [''],
      details: [''],
      address: [''],
      deadlineDays: [''],
      daysForDue: [''],
      totalValue: [''],
      totalArea: [''],
      quotationStatus: [''],
      customer: [],
      marbleshopUser: [],
      marbleshopItems: new FormArray([]),
      miscellaneousItems: new FormArray([]),
      createdAt: [],
    });
    this.loadCustomers()
  }

  closeQuotationForm() {
    throw new Error('Method not implemented.');
  }
  submitQuotationForm() {
    throw new Error('Method not implemented.');
  }

  loadCustomers() {
    this.customerService.getAllCustomersFromMarbleshop(this.authService.getMarbleshopId()).subscribe((data) => {
      this.customers = data
      console.log(data)
    })
  }
}
