import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Payment } from '../../domain/Payment';
import { Order } from '../../domain/Order';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import {MatDatepickerModule} from '@angular/material/datepicker';

@Component({
    selector: 'app-payment-form',
    imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatProgressSpinner, MatDividerModule, MatIconModule, MatDatepickerModule],
    templateUrl: './payment-form.component.html',
    styleUrl: './payment-form.component.sass'
})
export class PaymentFormComponent {

  close = output<boolean>()
  submit = output<Payment>()
  fb = inject(FormBuilder)
  orders = input<Order[]>()
  isSaving = input<boolean>()

  paymentForm!: FormGroup
  paymentTypes = [
    { name: 'Pix', value: 'PIX' },
    { name: 'Débito', value: 'DEBIT' },
    { name: 'Crédito', value: 'CREDIT' },
    { name: 'Dinheiro', value: 'CASH' },
    { name: 'Outros', value: 'OTHER' }

  ]

  constructor() {
    this.paymentForm = this.fb.group({
      id: [''],
      details: [''],
      payedValue: [''],
      marbleshopOrderId: [''],
      paymentType: [''],
      paymentDate: ['']
    })
  }
  closePaymentForm() {
    this.close.emit(true)
  }

  submitPaymentForm() {
    this.submit.emit(this.paymentForm.value)
  }

}
