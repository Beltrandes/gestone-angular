import { CurrencyPipe, NgClass } from '@angular/common';
import { Component, input } from '@angular/core';

@Component({
    selector: 'app-financial-balance',
    imports: [CurrencyPipe, NgClass],
    templateUrl: './financial-balance.component.html',
    styleUrl: './financial-balance.component.sass'
})
export class FinancialBalanceComponent {
  totalPayments = input<number>(0)
  totalBills = input<number>(0)

  calculateBalance() {
    return this.totalPayments() - this.totalBills();
  }

}
