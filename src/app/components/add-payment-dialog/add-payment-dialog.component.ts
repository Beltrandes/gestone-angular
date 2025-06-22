import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Payment } from '../../domain/Payment';

@Component({
  selector: 'app-add-payment-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatSelectModule],
  templateUrl: './add-payment-dialog.component.html',
  styleUrl: './add-payment-dialog.component.sass'
})
export class AddPaymentDialogComponent {
data = inject(MAT_DIALOG_DATA)
  payment = signal<Payment | null>(null)
  paymentForm!: FormGroup
  fb = inject(FormBuilder)
  paymentTypes = [
    { name: 'Pix', value: 'PIX' },
    { name: 'Débito', value: 'DEBIT' },
    { name: 'Crédito', value: 'CREDIT' },
    { name: 'Dinheiro', value: 'CASH' },
    { name: 'Outros', value: 'OTHER' }

  ]

  constructor() {
    this.paymentForm = this.fb.group({
      details: [''],
      payedValue: [''],
      marbleshopOrderId: [this.data.order.id, [Validators.required]],
      paymentType: [''],
      paymentDate: ['']
    })
  }

  resetForm() {
    this.paymentForm.reset();
    this.payment.set(null);
  }
}
