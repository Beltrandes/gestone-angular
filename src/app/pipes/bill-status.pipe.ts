import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'billStatus',
  standalone: true
})
export class BillStatusPipe implements PipeTransform {

  transform(billCategory: string): string {
    if (billCategory === 'PENDING') return 'Pendente'
    if (billCategory === 'PAID') return 'Pago'
    if (billCategory === 'OVERDUE') return 'Vencido'
    if (billCategory === 'PARTIALLY_PAID') return 'Parcialmente Pago'



    return ''
  }

}
