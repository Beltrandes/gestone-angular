import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'miscellaneousMaterialType',
  standalone: true
})
export class MiscellaneousMaterialTypePipe implements PipeTransform {

  transform(materialType: string): string {
    if (materialType === 'SINK_BOWL' || materialType === 'VANITY_BOWL') return 'Cuba'
    if (materialType === 'TANK_VAT') return 'Tanque'
    if (materialType === 'HOLDER') return 'Suporte'
    if (materialType === 'SUPPLIES') return 'Insumos'
    return ''
  }

}
