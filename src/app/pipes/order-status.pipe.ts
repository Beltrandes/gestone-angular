import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderStatus',
  standalone: true
})
export class OrderStatusPipe implements PipeTransform {

  transform(status: string): string {
    switch(status) {
      case 'PROJECTING': return 'Projetando'
      case 'WAITING_MATERIAL': return 'Aguardando material'
      case 'PRODUCING': return 'Em Produção'
      case 'PRODUCED': return 'Produzido'
      case 'INSTALLING': return 'Em Instalação'
      case 'INSTALLED': return 'Instalado'
      case 'DONE': return 'Finalizado'
      default: return ''
    }
  }

}
