import { Component, input, output } from '@angular/core';
import { MiscellaneousMaterial } from '../../domain/MiscellaneousMaterial';
import { CurrencyPipe } from '@angular/common';
import { MiscellaneousMaterialTypePipe } from '../../pipes/miscellaneous-material-type.pipe';

@Component({
    selector: 'app-miscellaneous-material-list',
    imports: [CurrencyPipe, MiscellaneousMaterialTypePipe],
    templateUrl: './miscellaneous-material-list.component.html'
})
export class MiscellaneousMaterialListComponent {
  miscellaneousMaterials = input<MiscellaneousMaterial[]>()
  openModal = output<MiscellaneousMaterial>()
  edit = output<MiscellaneousMaterial>()
  delete = output<MiscellaneousMaterial>()
  openUpdateMiscellaneousMaterialPrice(miscellaneousMaterial: MiscellaneousMaterial) {
    this.openModal.emit(miscellaneousMaterial)
  }

  editMiscellaneousMaterial(miscellaneousMaterial: MiscellaneousMaterial) {
    this.edit.emit(miscellaneousMaterial)
  }

  deleteMiscellaneousMaterial(miscellaneousMaterial: MiscellaneousMaterial) {
    this.delete.emit(miscellaneousMaterial)
  }
}
