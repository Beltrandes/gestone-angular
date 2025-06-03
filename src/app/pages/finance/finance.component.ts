import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { ControllerComponent } from "../../components/controller/controller.component";
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { Payment } from '../../domain/Payment';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { PaymentListComponent } from "../../components/payment-list/payment-list.component";
import { AsyncPipe, NgClass } from '@angular/common';
import { Bill } from '../../domain/Bill';
import { BillService } from '../../services/bill.service';
import { BillListComponent } from "../../components/bill-list/bill-list.component";
import { FinancialBalanceComponent } from '../../components/financial-balance/financial-balance.component';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { Order } from '../../domain/Order';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'app-finance',
  standalone: true,
  imports: [ControllerComponent, PaymentListComponent, AsyncPipe, BillListComponent, FinancialBalanceComponent, ModalComponent, PaymentFormComponent, NgClass],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.sass'
})
export class FinanceComponent implements OnInit {
  modalConfirmActionButtonColor = signal('info');
  transactionType = signal('payment')

  payments$!: Observable<Payment[]>
  bills$!: Observable<Bill[]>
  orders$!: Observable<Order[]>
  authService = inject(AuthService)
  paymentService = inject(PaymentService)
  billService = inject(BillService)
  orderService = inject(OrderService)

  totalPayments = 0
  totalBills = 0
  @ViewChild(ModalComponent) modal?: ModalComponent;


  private readonly subscriptions: Subscription = new Subscription();
  isPaymentFormOpened = signal(false);
  isBillFormOpened = signal(false);
  modalType = signal('transactionType')

  constructor() {
    this.loadPayments()
    this.loadBills()
  }

  ngOnInit(): void {
    this.subscriptions.add(
      combineLatest([this.payments$, this.bills$]).pipe(
        map(([payments, bills]) => {
          this.totalPayments = payments.reduce((sum, payment) => sum + payment.payedValue, 0);
          this.totalBills = bills.reduce((sum, bill) => sum + bill.paidValue, 0);
        })
      ).subscribe()
    );
    console.log(this.totalBills, this.totalPayments)
  }
  loadPayments() {
    this.payments$ = this.paymentService.getAllPaymentFromMarbleshop(this.authService.getMarbleshopId())
  }

  loadOrders() {
    this.orders$ = this.orderService.getAllOrderFromMarbleshop(this.authService.getMarbleshopId())
  }

  closePaymentForm() {
    this.isPaymentFormOpened.set(false)
  }
  openPaymentForm() {
    this.isPaymentFormOpened.set(true)
  }
  closeBillForm() {
    this.isBillFormOpened.set(false)
  }
  openBillForm() {
    this.isBillFormOpened.set(true)
  }
  loadBills() {
    this.bills$ = this.billService.getAllBillFromMarbleshop(this.authService.getMarbleshopId())

  }
  openModal() {
    if (this.modalType() == 'transactionType') {
      this.modal?.openModal('Registrando transação')
    }
  }
  closeModal() {
    this.modal?.closeModal()
  }
  confirmModal() {
    if (this.transactionType() == 'payment') {
      this.loadOrders()
      this.openPaymentForm()
      this.closeModal()
    }
    if (this.transactionType() == 'bill') {
      this.openBillForm()
    }
  }

  selectTransactionType(transactionType: string) {
    this.transactionType.set(transactionType)
  }
}
