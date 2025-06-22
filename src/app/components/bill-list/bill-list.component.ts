import { Component, input, output } from '@angular/core';
import { Bill } from '../../domain/Bill';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { BillCategoryPipe } from '../../pipes/bill-category.pipe';
import { BillStatusPipe } from "../../pipes/bill-status.pipe";
import { MatIconModule } from '@angular/material/icon';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { PaymentTypePipe } from "../../pipes/payment-type.pipe";
import { PaymentStatusPipe } from "../../pipes/payment-status.pipe";
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-bill-list',
  imports: [CurrencyPipe, DatePipe, BillCategoryPipe, BillStatusPipe, NgClass, MatAccordion, MatExpansionModule, MatIconModule, MatCardModule, MatDividerModule, PaymentTypePipe, PaymentStatusPipe, MatButtonModule, MatTooltipModule],
  templateUrl: './bill-list.component.html',
  styleUrl: './bill-list.component.sass'
})
export class BillListComponent {
  bills = input<Bill[]>()
  edit = output<Bill>()
  delete = output<Bill>()
  add = output<Bill>()


  editBill(bill: Bill) {
    this.edit.emit(bill);
  }

  deleteBill(bill: Bill) {
    this.delete.emit(bill);
  }

  addExpense(bill: Bill) {
    this.add.emit(bill);

  }

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

  getPaymentStatusClass(status: string): string {
    switch (status) {
      case 'PAID':
        return 'bg-success';
      case 'PARTIALLY_PAID':
        return 'bg-warn';
      case 'OVERDUE':
        return 'bg-danger';
      default:
        return '';
    }

  }
}
