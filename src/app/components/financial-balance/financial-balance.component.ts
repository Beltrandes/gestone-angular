import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-financial-balance',
  imports: [CurrencyPipe, MatCardModule],
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
