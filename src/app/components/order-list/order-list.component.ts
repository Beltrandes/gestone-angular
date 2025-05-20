import { CurrencyPipe, DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';
import { OrderStatusPipe } from '../../pipes/order-status.pipe';
import { Order } from '../../domain/Order';
import { PaymentStatusPipe } from '../../pipes/payment-status.pipe';
import { PaymentTypePipe } from '../../pipes/payment-type.pipe';

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [CurrencyPipe, DatePipe, DecimalPipe, OrderStatusPipe, PaymentStatusPipe, PaymentTypePipe, NgClass],
  templateUrl: './order-list.component.html',
  styleUrl: './order-list.component.sass'
})
export class OrderListComponent {

  orders = input<Order[]>()


  generateOrderPdf(orderId: string) {
    return null;
  }

  editOrder(order: Order) {
    return null;
  }

  getPaymentStatusClass(status: string): string {
    switch (status) {
      case 'PAID':
        return 'text-light bg-success px-2 py-1 rounded';
      case 'PARTIALLY_PAID':
        return 'text-light bg-warning px-2 py-1 rounded';
      case 'OVERDUE':
        return 'text-light bg-danger px-2 py-1 rounded';
      default:
        return '';
    }

  }
  getOrderStatusClass(status: string): string {
      switch (status) {
        case 'PROJECTING':
          return 'text-light bg-info px-1 py-1 rounded';
        case 'PARTIALLY_PAID':
          return 'text-light bg-warning px-2 py-1 rounded';
        case 'OVERDUE':
          return 'text-light bg-danger px-2 py-1 rounded';
        default:
          return '';
      }
    }
}


