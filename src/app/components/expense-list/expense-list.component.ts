import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { Expense } from '../../domain/Expense';
import { BillStatusPipe } from "../../pipes/bill-status.pipe";

@Component({
  selector: 'app-expense-list',
  imports: [MatAccordion, MatExpansionModule, MatIconModule, CurrencyPipe, DatePipe, BillStatusPipe, NgClass],
  templateUrl: './expense-list.component.html',
  styleUrl: './expense-list.component.sass'
})
export class ExpenseListComponent {
  expenses = input<Expense[]>()
  getBillStatusClass(status: string): string {
    switch (status) {
      case 'PENDING':
        return 'text-bg-warning px-1 py-1 rounded fw-semibold';
      case 'PAID':
        return 'text-bg-success px-2 py-1 rounded fw-semibold';
      case 'PARTIALLY_PAID':
        return 'text-bg-info px-2 py-1 rounded fw-semibold';
      case 'OVERDUE':
        return 'text-bg-danger px-2 py-1 rounded fw-semibold';
      default:
        return '';
    }
  }
}
