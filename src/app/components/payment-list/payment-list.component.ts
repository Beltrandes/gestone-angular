import { Component, input } from '@angular/core';
import { Payment } from '../../domain/Payment';
import { CurrencyPipe, DatePipe, NgClass } from '@angular/common';
import { PaymentTypePipe } from '../../pipes/payment-type.pipe';
import { PaymentStatusPipe } from "../../pipes/payment-status.pipe";
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
    selector: 'app-payment-list',
    imports: [CurrencyPipe, DatePipe, PaymentTypePipe, PaymentStatusPipe, NgClass, MatExpansionModule,MatIconModule],
    templateUrl: './payment-list.component.html',
    styleUrl: './payment-list.component.sass'
})
export class PaymentListComponent {
  payments = input<Payment[]>()
  getOrderPaymentStatusClass(status: string): string {
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
