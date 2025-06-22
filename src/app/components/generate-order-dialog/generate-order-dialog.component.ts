import { MatSelectModule } from '@angular/material/select';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, UntypedFormArray } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Payment } from '../../domain/Payment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-generate-order-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatButtonModule, ReactiveFormsModule, MatDatepickerModule, MatSelectModule, MatInputModule, MatIconModule, MatDividerModule],
  templateUrl: './generate-order-dialog.component.html',
  styleUrl: './generate-order-dialog.component.sass'
})
export class GenerateOrderDialogComponent {
  orderForm!: FormGroup
  data = inject(MAT_DIALOG_DATA)
  fb = inject(FormBuilder)

  paymentTypes = [
    { name: 'Pix', value: 'PIX' },
    { name: 'Débito', value: 'DEBIT' },
    { name: 'Crédito', value: 'CREDIT' },
    { name: 'Dinheiro', value: 'CASH' },
    { name: 'Outros', value: 'OTHER' }

  ]

  constructor() {
    this.orderForm = this.fb.group({
      workAddress: [''],
      quotationId: [this.data.quotation.id],
      discount: [],
      payments: this.fb.array([]),
      notes: ['']
    })
  }

  private createPayment(payment: Payment = { id: '', details: '', payedValue: 0, paymentType: '', createdAt: new Date() }) {
    return this.fb.group({
      id: payment.id,
      details: payment.details,
      payedValue: payment.payedValue,
      paymentType: payment.paymentType,
    })
  }

  addNewPayment() {
    const payments = this.orderForm.get('payments') as UntypedFormArray
    payments.push(this.createPayment())
  }

  getPaymentsFormArray() {
    return (<UntypedFormArray>this.orderForm.get('payments')).controls
  }

  removePayment(index: number) {
    const payments = this.orderForm.get('payments') as UntypedFormArray
    payments.removeAt(index)
  }
}
