import {
  Component,
  inject,
  input,
  output,
  signal,
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-modal',
  imports: [MatDialogModule],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.sass'
})
export class ModalComponent {
  modalTitle = signal('');
  modalConfirmActionButtonText = input('');
  modalConfirmActionButtonColor = input('primary');
  data = inject(MAT_DIALOG_DATA)

  confirm = output();
  close = output();

}
