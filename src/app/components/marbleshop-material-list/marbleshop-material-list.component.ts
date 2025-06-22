import { Component, input, output } from '@angular/core';
import { MarbleshopMaterial } from '../../domain/MarbleshopMaterial';
import { CurrencyPipe } from '@angular/common';
import { MarbleshopMaterialTypePipe } from '../../pipes/marbleshop-material-type.pipe';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {MatTooltipModule} from '@angular/material/tooltip';

@Component({
    selector: 'app-marbleshop-material-list',
    imports: [CurrencyPipe, MarbleshopMaterialTypePipe, MatCardModule, MatButtonModule, MatIconModule, MatMenuModule, MatTooltipModule],
    templateUrl: './marbleshop-material-list.component.html',
    styleUrls: ['./marbleshop-material-list.component.sass'],
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
