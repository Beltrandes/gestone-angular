import { Component, input } from '@angular/core';
import { Quotation } from '../../domain/Quotation';
import { CurrencyPipe, DatePipe, DecimalPipe } from '@angular/common';
import { QuotationStatusPipe } from '../../pipes/quotation-status.pipe';

@Component({
  selector: 'app-quotation-list',
  standalone: true,
  imports: [CurrencyPipe, DecimalPipe, DatePipe, QuotationStatusPipe],
  templateUrl: './quotation-list.component.html',
  styleUrl: './quotation-list.component.sass'
})
export class QuotationListComponent {
  quotations = input<Quotation[]>()

}
