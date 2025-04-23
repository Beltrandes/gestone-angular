import { Component, input, output } from '@angular/core';
import { MarbleshopMaterial } from '../../domain/MarbleshopMaterial';
import { CurrencyPipe } from '@angular/common';
import { MarbleshopMaterialTypePipe } from '../../pipes/marbleshop-material-type.pipe';

@Component({
  selector: 'app-marbleshop-material-list',
  standalone: true,
  imports: [CurrencyPipe, MarbleshopMaterialTypePipe],
  templateUrl: './marbleshop-material-list.component.html',
  styleUrl: './marbleshop-material-list.component.sass'
})
export class MarbleshopMaterialListComponent {

  marbleshopMaterials = input<MarbleshopMaterial[]>()
  openModel = output<boolean>()
  openUpdateMaterialPriceModal(materialId: string) {
    this.openModel.emit(true)
  }
}
