import { Component, inject, input, output } from '@angular/core';
import { Quotation } from '../../domain/Quotation';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { QuotationStatusPipe } from '../../pipes/quotation-status.pipe';
import { QuotationService } from '../../services/quotation.service';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-quotation-list',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, DatePipe, QuotationStatusPipe, MatAccordion, MatExpansionModule, MatIconModule, MatDividerModule, MatButtonModule],
  templateUrl: './quotation-list.component.html',
  styleUrl: './quotation-list.component.sass'
})
export class QuotationListComponent {
  quotations = input<Quotation[]>()

  quotationService = inject(QuotationService)

  edit = output<Quotation>()

  copy = output<Quotation>()

  generatePdfOfQuotation(quotationId: string) {
    this.quotationService.generateQuotationPdf(quotationId).subscribe((pdf) => {
      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }

  editQuotation(quotation: Quotation) {
    this.edit.emit(quotation);
  }

  copyQuotation(quotation: Quotation) {
    this.copy.emit(quotation);
  }
}
