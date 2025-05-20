import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentStatus',
  standalone: true
})
export class PaymentStatusPipe implements PipeTransform {

  transform(status: string): string {
    switch(status) {
      case 'PAID': return 'Pago'
      case 'PARTIALLY_PAID': return 'Parcialmente Pago'
      case 'OVERDUE': return 'Em Atraso'
      default: return ''
    }
  }

}
