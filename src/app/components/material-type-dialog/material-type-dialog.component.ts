import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-material-type-dialog',
  imports: [MatDialogModule, MatButtonToggleModule, MatButtonModule, FormsModule],
  templateUrl: './material-type-dialog.component.html',
  styleUrl: './material-type-dialog.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialTypeDialogComponent {
  materialType = 'marbleshop';
  data = inject(MAT_DIALOG_DATA);
}
