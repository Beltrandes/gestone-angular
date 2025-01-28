import { Component, inject, input, output } from '@angular/core';
import { Quotation } from '../../domain/Quotation';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { QuotationStatusPipe } from '../../pipes/quotation-status.pipe';
import { QuotationService } from '../../services/quotation.service';

@Component({
  selector: 'app-quotation-list',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, DatePipe, QuotationStatusPipe],
  templateUrl: './quotation-list.component.html',
  styleUrl: './quotation-list.component.sass'
})
export class QuotationListComponent {
  quotations = input<Quotation[]>()

  quotationService = inject(QuotationService)

  edit = output<string>()

  generatePdfOfQuotation(quotationId: string) {
    this.quotationService.generateQuotationPdf(quotationId).subscribe((pdf) => {
      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  editQuotation(quotationId: string) {
    this.edit.emit(quotationId);
  }

}
