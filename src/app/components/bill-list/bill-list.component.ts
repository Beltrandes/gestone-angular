import { Component, input } from '@angular/core';
import { Bill } from '../../domain/Bill';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { BillCategoryPipe } from '../../pipes/bill-category.pipe';
import { BillStatusPipe } from "../../pipes/bill-status.pipe";

@Component({
  selector: 'app-bill-list',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, BillCategoryPipe, BillStatusPipe, NgClass],
  templateUrl: './bill-list.component.html',
  styleUrl: './bill-list.component.sass'
})
export class BillListComponent {
  bills = input<Bill[]>()

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
