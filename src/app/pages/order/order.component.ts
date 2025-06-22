import { Component, inject, OnInit, signal } from '@angular/core';
import { ControllerComponent } from '../../components/controller/controller.component';
import { Order } from '../../domain/Order';
import { OrderService } from '../../services/order.service';
import { AuthService } from '../../services/auth.service';
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { OrderListComponent } from '../../components/order-list/order-list.component';
import { OrderFormComponent } from "../../components/order-form/order-form.component";
import { ToastrService } from 'ngx-toastr';
import { MatDialog } from '@angular/material/dialog';
import { AddPaymentDialogComponent } from '../../components/add-payment-dialog/add-payment-dialog.component';
import { PaymentService } from '../../services/payment.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-order',
  imports: [ControllerComponent, OrderListComponent, OrderFormComponent, AsyncPipe, MatSnackBarModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.sass'
})
export class OrderComponent implements OnInit {

  orders$!: Observable<Order[]>
  authService = inject(AuthService);
  marbleshopId!: string | null
  isFormOpened = signal(false)
  orderService = inject(OrderService)
  paymentService = inject(PaymentService)
  isSaving = signal(false)
  dialog = inject(MatDialog)
  private readonly _snackBar = inject(MatSnackBar);


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
      error: () => {
        this.openSnackBar(
          'Erro ao salvar o pedido, tente novamente mais tarde', 'Fechar')
      },
      complete: () => {
        setTimeout(() => {
          this.closeOrderForm();
          this.openSnackBar(
            'Pedido salvo com sucesso!', 'Fechar');
          this.isSaving.set(false);
          this.loadOrders();
        }, 2000);
      }
    })
  }

  openAddPaymentDialog(order: Order) {
    const addPaymentDialogRef = this.dialog.open(AddPaymentDialogComponent, {
      data: { order: order }
    });

    addPaymentDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.paymentService.savePayment(result).subscribe({
          next: () => {
            this.openSnackBar('Pagamento adicionado com sucesso!', 'Fechar');
            this.loadOrders();
          },
          error: (err) => {
            this.openSnackBar('Erro ao adicionar pagamento: ', 'Fechar');
          }
        });
      }
    });
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 3000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
    });
  }

  generatePdfOfOrder(orderId: string) {
    this.orderService.generateOrderPdf(orderId).subscribe((pdf) => {
      const blob = new Blob([pdf], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      window.open(url);
    });
  }
}
