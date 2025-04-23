import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'marbleshopMaterialType',
  standalone: true
})
export class MarbleshopMaterialTypePipe implements PipeTransform {

  transform(materialType: string): string {
    if (materialType === 'MARBLE') return 'Mármore'
    if (materialType === 'GRANITE') return 'Granito'
    if (materialType === 'QUARTZ') return 'Quartzo'
    if (materialType === 'SHEET') return 'Lâmina'
    return ''
  }
}
