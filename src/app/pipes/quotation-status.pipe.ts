import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'quotationStatus',
  standalone: true
})
export class QuotationStatusPipe implements PipeTransform {

  transform(status: string): string {
    switch(status) {
      case 'PENDING': return 'Em Aberto'
      case 'APPROVED': return 'Aprovado'
      case 'EXPIRED': return 'Expirado'
      default: return ''
    }
  }

}
