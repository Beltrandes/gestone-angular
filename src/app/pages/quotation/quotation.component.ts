import { Component, inject, signal } from '@angular/core';
import { ControllerComponent } from '../../components/controller/controller.component';
import { Quotation } from '../../domain/Quotation';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { QuotationListComponent } from '../../components/quotation-list/quotation-list.component';
import { QuotationService } from '../../services/quotation.service';
import { AuthService } from '../../services/auth.service';
import { QuotationFormComponent } from '../../components/quotation-form/quotation-form.component';
import { MatDialog } from '@angular/material/dialog';
import { GenerateOrderDialogComponent } from '../../components/generate-order-dialog/generate-order-dialog.component';
import { OrderService } from '../../services/order.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-quotation',
  imports: [
    ControllerComponent,
    AsyncPipe,
    QuotationListComponent,
    QuotationFormComponent
  ],
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.sass'
})
export class QuotationComponent {
  quotations$!: Observable<Quotation[]>;
  isQuotationFormOpened = signal<boolean>(false);
  quotationService = inject(QuotationService);
  authService = inject(AuthService);
  marbleshopId!: string | null;
  isSaving = signal<boolean>(false)
  quotation!: Quotation;
  dialog = inject(MatDialog)
  orderService = inject(OrderService)
  searchString = signal('')
  private readonly _snackBar = inject(MatSnackBar);

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      verticalPosition: 'bottom',
      horizontalPosition: 'right'
    });
  }
  constructor() {
    this.loadQuotations();
  }

  loadQuotations() {
    this.marbleshopId = this.authService.getMarbleshopId();
    this.quotations$ = this.quotationService.getAllQuotationFromMarbleshop(
      this.marbleshopId
    );
  }


  openQuotationForm() {
    this.isQuotationFormOpened.set(true)
  }

  closeQuotationForm() {
    this.isQuotationFormOpened.set(false);
  }

  saveQuotation(quotation: Quotation) {
    this.quotationService.saveQuotation(quotation).subscribe({
      next: () => {
        this.isSaving.set(true);
      },
      error: () => {
        this.openSnackBar('Erro ao salvar orçamento!', 'Fechar')
      },
      complete: () => {
        setTimeout(() => {
          this.closeQuotationForm();
          this.openSnackBar('Orçamento criado com sucesso!', 'Fechar')
          this.isSaving.set(false);
          this.loadQuotations();
        }, 2000);
      },
    });
  }

  editQuotation(quotation: Quotation) {
    this.closeQuotationForm()
    this.quotation = quotation;
    this.openQuotationForm()
  }
  copyQuotation(quotation: Quotation) {
    this.closeQuotationForm()
    quotation.id = ''
    this.quotation = quotation
    this.openQuotationForm()
  }

  openGenerateOrderDialog(quotation: Quotation) {
    const generateOrderDialogRef = this.dialog.open(GenerateOrderDialogComponent, {
      data: {
        quotation: quotation
      }
    })

    generateOrderDialogRef.afterClosed().subscribe(result => {
      this.orderService.saveOrder(result).subscribe({
        next: () => {
          this.openSnackBar('Pedido gerado com sucesso!', 'Fechar')
        }
      })
    })
  }

  searchQuotation(searchString: string) {
    this.searchString.set(searchString);
  }

  generatePdfOfQuotation(quotationId: string) {
    this.quotationService.generateQuotationPdf(quotationId).subscribe((pdf) => {
      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
