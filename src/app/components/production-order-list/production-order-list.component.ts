import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { ProductionOrder } from '../../domain/ProductionOrder';
import { DatePipe, DecimalPipe } from '@angular/common';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-production-order-list',
  imports: [MatAccordion, MatExpansionModule, MatIconModule, MatCardModule ,MatButtonModule, MatDividerModule, DecimalPipe, DatePipe],
  templateUrl: './production-order-list.component.html',
  styleUrl: './production-order-list.component.sass'
})
export class ProductionOrderListComponent {
generateProductionOrderPdf(arg0: string) {
throw new Error('Method not implemented.');
}
  productionOrders = input<ProductionOrder[]>()
}
