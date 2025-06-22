import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-transaction-type-dialog',
  imports: [MatDialogModule, MatButtonModule, MatButtonToggleModule, FormsModule],
  templateUrl: './transaction-type-dialog.component.html',
  styleUrl: './transaction-type-dialog.component.sass'
})
export class TransactionTypeDialogComponent {
  data = inject(MAT_DIALOG_DATA)
  transactionType = 'payment'
}
