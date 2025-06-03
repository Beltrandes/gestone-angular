import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'billCategory',
  standalone: true
})
export class BillCategoryPipe implements PipeTransform {

  transform(billCategory: string): string {
    if (billCategory === 'RAW_MATERIAL') return 'Matéria Prima'
    if (billCategory === 'WORK_FORCE') return 'Mão de Obra'
    if (billCategory === 'TOOLS') return 'Ferramentas'
    if (billCategory === 'SUPPLIES') return 'Insumos'
    if (billCategory === 'EQUIPMENT') return 'Equipamentos'
    if (billCategory === 'FIXED_EXPENSE') return 'Despesa Fixa'
    if (billCategory === 'OUTSOURCED_SERVICES') return 'Terceirizados'
    if (billCategory === 'MAINTENANCE') return 'Manutenção'
    if (billCategory === 'TAXES') return 'Impostos'
    if (billCategory === 'OTHER') return 'Outros'
    return ''
  }

}
