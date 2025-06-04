import { Component, input, output } from '@angular/core';
import { MarbleshopMaterial } from '../../domain/MarbleshopMaterial';
import { CurrencyPipe } from '@angular/common';
import { MarbleshopMaterialTypePipe } from '../../pipes/marbleshop-material-type.pipe';

@Component({
    selector: 'app-marbleshop-material-list',
    imports: [CurrencyPipe, MarbleshopMaterialTypePipe],
    templateUrl: './marbleshop-material-list.component.html'
})
export class MarbleshopMaterialListComponent {

  marbleshopMaterials = input<MarbleshopMaterial[]>()
  openModal = output<MarbleshopMaterial>()
  edit = output<MarbleshopMaterial>()
  delete = output<MarbleshopMaterial>()
  openUpdateMarbleshopMaterialPriceModal(marbleshopMaterial: MarbleshopMaterial) {
    this.openModal.emit(marbleshopMaterial)
  }

  editMarbleshopMaterial(marbleshopMaterial: MarbleshopMaterial) {
    this.edit.emit(marbleshopMaterial)
  }

  deleteMarbleshopMaterial(marbleshopMaterial: MarbleshopMaterial) {
    this.delete.emit(marbleshopMaterial)
  }
}
