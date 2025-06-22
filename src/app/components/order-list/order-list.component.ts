import { CurrencyPipe, DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { Component, input, output } from '@angular/core';
import { OrderStatusPipe } from '../../pipes/order-status.pipe';
import { Order } from '../../domain/Order';
import { PaymentStatusPipe } from '../../pipes/payment-status.pipe';
import { PaymentTypePipe } from '../../pipes/payment-type.pipe';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
    selector: 'app-order-list',
    imports: [CurrencyPipe, DatePipe, DecimalPipe, OrderStatusPipe, PaymentStatusPipe, PaymentTypePipe, NgClass, MatExpansionModule, MatDividerModule, MatIconModule, MatButtonModule, MatCardModule, MatTooltipModule],
    templateUrl: './order-list.component.html',
    styleUrl: './order-list.component.sass'
})
export class OrderListComponent {

  orders = input<Order[]>()
  add = output<Order>()
  pdf = output<string>()

  generateOrderPdf(orderId: string) {
    this.pdf.emit(orderId)
  }
  addPayment(order: Order) {
    this.add.emit(order);
  }
  editOrder(order: Order) {
    return null;
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


