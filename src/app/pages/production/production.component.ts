import { Component, inject } from '@angular/core';
import { ControllerComponent } from "../../components/controller/controller.component";
import { ProductionOrderListComponent } from "../../components/production-order-list/production-order-list.component";
import { Observable } from 'rxjs';
import { ProductionOrder } from '../../domain/ProductionOrder';
import { ProductionOrderService } from '../../services/production-order.service';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-production',
  imports: [ControllerComponent, ProductionOrderListComponent, AsyncPipe],
  templateUrl: './production.component.html',
  styleUrl: './production.component.sass'
})
export class ProductionComponent {
  productionOrders$!: Observable<ProductionOrder[]>
  productionOrderService = inject(ProductionOrderService)
  authService = inject(AuthService)
  marbleshopId = this.authService.getMarbleshopId()

  constructor() {
    this.loadProductionOrders()
  }
  loadProductionOrders() {
    this.productionOrders$ = this.productionOrderService.getAllProductionOrderFromMarbleshop(this.marbleshopId)
  }
}
