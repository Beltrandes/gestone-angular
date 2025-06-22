import { Component, computed, inject, input, output } from '@angular/core';
import { Quotation } from '../../domain/Quotation';
import { CurrencyPipe, DatePipe, DecimalPipe, NgClass } from '@angular/common';
import { QuotationStatusPipe } from '../../pipes/quotation-status.pipe';
import { QuotationService } from '../../services/quotation.service';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
@Component({
    selector: 'app-quotation-list',
    imports: [CurrencyPipe, DecimalPipe,NgClass , DatePipe, QuotationStatusPipe, MatAccordion, MatExpansionModule, MatIconModule, MatDividerModule, MatButtonModule, MatTooltipModule],
    templateUrl: './quotation-list.component.html',
    styleUrl: './quotation-list.component.sass'
})
export class QuotationListComponent {
  quotations = input<Quotation[]>()

  quotationService = inject(QuotationService)

  searchString = input<string>()

  order = output<Quotation>()

  edit = output<Quotation>()

  copy = output<Quotation>()

  pdf = output<string>()

  filteredQuotations = computed(() => {
      const searchTerm = (this.searchString() ?? '').toLowerCase();
      let filteredList = this.quotations()!.filter(quotation => quotation.name?.toLowerCase().includes(searchTerm) || quotation.customer.name?.includes(searchTerm) || quotation.customer.phone?.includes(searchTerm))
      return filteredList
    })

  editQuotation(quotation: Quotation) {
    this.edit.emit(quotation);
  }

  copyQuotation(quotation: Quotation) {
    this.copy.emit(quotation);
  }

  generateOrder(quotation: Quotation) {
    this.order.emit(quotation)
  }

  getQuotationStatusClass(status: string): string {
    switch (status) {
      case 'APPROVED':
        return 'text-success';
      case 'PENDING':
        return 'text-warn';
      case 'EXPIRED':
        return 'text-danger';
      default:
        return '';
    }

  }

  generateQuotationPdf(quotationId: string) {
    this.pdf.emit(quotationId)
  }
}
