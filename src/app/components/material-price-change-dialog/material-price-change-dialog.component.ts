import { ChangeDetectionStrategy, Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-material-price-change-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatButtonModule, MatInputModule, FormsModule],
  templateUrl: './material-price-change-dialog.component.html',
  styleUrl: './material-price-change-dialog.component.sass',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MaterialPriceChangeDialogComponent {
  readonly dialogRef = inject(MatDialogRef<MaterialPriceChangeDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA)
  readonly price = model<number>(this.data.price);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
