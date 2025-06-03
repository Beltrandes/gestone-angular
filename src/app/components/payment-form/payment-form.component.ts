import { Component, inject, input, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Payment } from '../../domain/Payment';
import { Order } from '../../domain/Order';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.sass'
})
export class PaymentFormComponent {

  close = output<boolean>()
  submit = output<Payment>()
  fb = inject(FormBuilder)
  orders = input<Order[]>()

  paymentForm!: FormGroup
  isSaving = input()
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
