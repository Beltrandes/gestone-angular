import {
  Component,
  input,
  output,
  signal,
} from '@angular/core';
@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.sass',
})
export class ModalComponent {
  modalTitle = signal('');
  modalConfirmActionButtonText = input('');
  modalConfirmActionButtonColor = input('primary');

  confirm = output();
  close = output();
  openModal(modalTitle: string) {
    const modal = document.getElementById('modal');
    if (modal != null) {
      modal.style.display = 'block';
      this.modalTitle.set(modalTitle);
    }
  }

  closeModal() {
    const modal = document.getElementById('modal');
    if (modal != null) {
      modal.style.display = 'none';
    }
  }

  confirmAction() {
    this.confirm.emit();
  }
}
