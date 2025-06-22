import { Component, inject, signal } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Expense } from '../../domain/Expense';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-add-expense-dialog',
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule, MatIconModule, MatFormFieldModule, MatDatepickerModule, MatInputModule, MatSelectModule],
  templateUrl: './add-expense-dialog.component.html',
  styleUrl: './add-expense-dialog.component.sass'
})
export class AddExpenseDialogComponent {
  data = inject(MAT_DIALOG_DATA)
  expense = signal<Expense | null>(null)
  expenseForm!: FormGroup
  fb = inject(FormBuilder)
  paymentTypes = [
    { name: 'Pix', value: 'PIX' },
    { name: 'Débito', value: 'DEBIT' },
    { name: 'Crédito', value: 'CREDIT' },
    { name: 'Dinheiro', value: 'CASH' },
    { name: 'Outros', value: 'OTHER' }

  ]

  constructor() {
    this.expenseForm = this.fb.group({
      details: ['', [Validators.required]],
      paidValue: ['', [Validators.required]],
      paymentDate: [''],
      paymentType: [''],
      billId: [this.data.bill.id],
    })
  }

  resetForm() {
    this.expenseForm.reset();
    this.expense.set(null);
  }
}
