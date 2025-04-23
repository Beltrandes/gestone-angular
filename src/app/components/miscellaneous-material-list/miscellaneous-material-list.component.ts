import { Component, input } from '@angular/core';
import { MiscellaneousMaterial } from '../../domain/MiscellaneousMaterial';
import { CurrencyPipe } from '@angular/common';
import { MiscellaneousMaterialTypePipe } from '../../pipes/miscellaneous-material-type.pipe';

@Component({
  selector: 'app-miscellaneous-material-list',
  standalone: true,
  imports: [CurrencyPipe, MiscellaneousMaterialTypePipe],
  templateUrl: './miscellaneous-material-list.component.html',
  styleUrl: './miscellaneous-material-list.component.sass'
})
export class MiscellaneousMaterialListComponent {
  miscellaneousMaterials = input<MiscellaneousMaterial[]>()
}
