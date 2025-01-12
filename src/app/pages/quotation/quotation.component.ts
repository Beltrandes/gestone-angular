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
  constructor() {
    this.loadQuotations();
  }

  loadQuotations() {
    this.marbleshopId = this.authService.getMarbleshopId();
    this.quotations$ = this.quotationService.getAllQuotationFromMarbleshop(
      this.marbleshopId
    );
  }

  openAddQuotationForm() {
    this.isQuotationFormOpened.set(true)
  }
}
