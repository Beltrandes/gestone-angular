import { Component, ElementRef, inject, input, output, ViewChildren } from '@angular/core';
import { FormGroup, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Expense } from '../../domain/Expense';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { Bill } from '../../domain/Bill';
import { BillCategoryPipe } from "../../pipes/bill-category.pipe";
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-expense-form',
  imports: [ReactiveFormsModule, MatCardModule, MatFormFieldModule, MatButtonModule, MatSelectModule, MatIconModule, MatButtonModule, MatSelect, MatInput, BillCategoryPipe, MatProgressSpinnerModule, MatDatepickerModule],
  templateUrl: './expense-form.component.html',
  styleUrl: './expense-form.component.sass'
})
export class ExpenseFormComponent {
  expenseForm!: FormGroup
  bills = input<Bill[]>()
  close = output<boolean>()
  isSaving = input<boolean>();
  submit = output<Expense>()
  fb = inject(FormBuilder);
  @ViewChildren('paidValueInput') paidValueInput!: ElementRef
  paymentTypes = [
    { name: 'Pix', value: 'PIX' },
    { name: 'Débito', value: 'DEBIT' },
    { name: 'Crédito', value: 'CREDIT' },
    { name: 'Dinheiro', value: 'CASH' },
    { name: 'Outros', value: 'OTHER' }

  ]

  constructor() {
    this.expenseForm = this.fb.group({
      id: [''],
      details: [''],
      paidValue: [''],
      paymentDate: [''],
      paymentType: [''],
      billId: ['']
    });
    console.log('ExpenseFormComponent initialized');
  }

  closeExpenseForm() {
    this.close.emit(true);
  }

  submitExpenseForm() {
    if (this.expenseForm.valid) {
      this.submit.emit(this.expenseForm.value);
    } else {
      console.error('Form is invalid');
    }
  }
}
