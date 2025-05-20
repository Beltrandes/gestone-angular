import { Component, inject, OnInit, signal } from '@angular/core';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { ControllerComponent } from '../../components/controller/controller.component';
import { Order } from '../../domain/Order';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { OrderListComponent } from '../../components/order-list/order-list.component';
import { OrderFormComponent } from "../../components/order-form/order-form.component";
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [NavbarComponent, ControllerComponent, OrderListComponent, OrderFormComponent, AsyncPipe],
  templateUrl: './order.component.html',
  styleUrl: './order.component.sass'
})
export class OrderComponent implements OnInit {

  orders$!: Observable<Order[]>
  authService = inject(AuthService);
  marbleshopId!: string | null
  isFormOpened = signal(false)
  orderService = inject(OrderService)
  toastr = inject(ToastrService);
  isSaving = signal(false)

  ngOnInit(): void {
    this.loadOrders()
  }

  loadOrders() {
    this.marbleshopId = this.authService.getMarbleshopId()
    this.orders$ = this.orderService.getAllOrderFromMarbleshop(this.marbleshopId)
  }

  openOrderForm() {
    this.isFormOpened.set(true)
  }

  closeOrderForm() {
    this.isFormOpened.set(false)
  }

  saveOrder(order: Order) {
    this.orderService.saveOrder(order).subscribe({
      next: () => {
        this.isSaving.set(true);
      },
      error: (err) => {
        this.toastr.error(
          'Erro ao salvar, tente novamente mais tarde',
          'Mensagem do sistema'
        );
      },
      complete: () => {
setTimeout(() => {
          this.closeOrderForm();
          this.toastr.success(
            'Pedido gerado com sucesso!',
            'Mensagem do sistema'
          );
          this.isSaving.set(false);
          this.loadOrders();
        }, 2000);
      }
    })
  }
}
