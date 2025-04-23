import { Component, inject, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ControllerComponent } from '../../components/controller/controller.component';
import { Quotation } from '../../domain/Quotation';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { QuotationListComponent } from '../../components/quotation-list/quotation-list.component';
import { QuotationService } from '../../services/quotation.service';
import { AuthService } from '../../services/auth.service';
import { QuotationFormComponent } from '../../components/quotation-form/quotation-form.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-quotation',
  standalone: true,
  imports: [
    NavbarComponent,
    ControllerComponent,
    AsyncPipe,
    QuotationListComponent,
    QuotationFormComponent
  ],
  templateUrl: './quotation.component.html',
  styleUrl: './quotation.component.sass',
})
export class QuotationComponent {
  quotations$!: Observable<Quotation[]>;
  isQuotationFormOpened = signal<boolean>(false);
  quotationService = inject(QuotationService);
  authService = inject(AuthService);
  marbleshopId!: string | null;
  isSaving = signal<boolean>(false)
  toastr = inject(ToastrService);
  quotation!: Quotation;
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
        this.toastr.error(
          'Ocorreu um erro, tente novamente mais tarde',
          'Mensagem do sistema'
        );
      },
      complete: () => {
        setTimeout(() => {
          this.closeQuotationForm();
          this.toastr.success(
            'Orçamento criado com sucesso!',
            'Mensagem do sistema'
          );
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
    console.log(quotation)

  }
}
