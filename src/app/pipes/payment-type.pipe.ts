import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'paymentType',
  standalone: true
})
export class PaymentTypePipe implements PipeTransform {

  transform(type: string): string {
    switch(type) {
      case 'CASH': return 'Dinheiro'
      case 'CREDIT': return 'Crédito'
      case 'PIX': return 'Pix'
      case 'DEBIT': return 'Débito'
      case 'OTHER': return 'Outro'
      default: return ''
    }
  }

}
