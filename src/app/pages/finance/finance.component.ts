import { Component, inject, OnInit, signal } from '@angular/core';
import { ControllerComponent } from "../../components/controller/controller.component";
import { combineLatest, map, Observable, Subscription } from 'rxjs';
import { Payment } from '../../domain/Payment';
import { PaymentService } from '../../services/payment.service';
import { AuthService } from '../../services/auth.service';
import { PaymentListComponent } from "../../components/payment-list/payment-list.component";
import { AsyncPipe } from '@angular/common';
import { FinancialBalanceComponent } from '../../components/financial-balance/financial-balance.component';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';
import { Order } from '../../domain/Order';
import { OrderService } from '../../services/order.service';
import { MatDialog } from '@angular/material/dialog';
import { TransactionTypeDialogComponent } from '../../components/transaction-type-dialog/transaction-type-dialog.component';
import { Expense } from '../../domain/Expense';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseListComponent } from "../../components/expense-list/expense-list.component";
import { ExpenseFormComponent } from "../../components/expense-form/expense-form.component";
import { Bill } from '../../domain/Bill';
import { BillService } from '../../services/bill.service';

@Component({
  selector: 'app-finance',
  imports: [ControllerComponent, PaymentListComponent, AsyncPipe, FinancialBalanceComponent, PaymentFormComponent, ExpenseListComponent, ExpenseFormComponent],
  templateUrl: './finance.component.html',
  styleUrl: './finance.component.sass'
})
export class FinanceComponent implements OnInit {
  submitBillForm($event: Expense) {
    throw new Error('Method not implemented.');
  }
  modalConfirmActionButtonColor = signal('info');
  transactionType = signal('payment')

  payments$!: Observable<Payment[]>
  expenses$!: Observable<Expense[]>
  orders$!: Observable<Order[]>
  bills$!: Observable<Bill[]>
  authService = inject(AuthService)
  paymentService = inject(PaymentService)
  expenseService = inject(ExpenseService)
  orderService = inject(OrderService)
  billService = inject(BillService)
  readonly dialog = inject(MatDialog)

  totalPayments = 0
  totalExpenses = 0


  private readonly subscriptions: Subscription = new Subscription();
  isPaymentFormOpened = signal(false);
  isExpenseFormOpened = signal(false);
  modalType = signal('transactionType')
  isSaving = signal(false);

  constructor() {
    this.loadPayments()
    this.loadExpenses()
  }

  ngOnInit(): void {
    this.subscriptions.add(
      combineLatest([this.payments$, this.expenses$]).pipe(
        map(([payments, expenses]) => {
          this.totalPayments = payments.reduce((sum, payment) => sum + payment.payedValue, 0);
          this.totalExpenses = expenses.reduce((sum, expense) => sum + expense.paidValue, 0);
        })
      ).subscribe()
    );
  }
  loadPayments() {
    this.payments$ = this.paymentService.getAllPaymentFromMarbleshop(this.authService.getMarbleshopId())
  }

  loadOrders() {
    this.orders$ = this.orderService.getAllOrderFromMarbleshop(this.authService.getMarbleshopId())
  }

  loadBills() {
    this.bills$ = this.billService.getAllBillFromMarbleshop(this.authService.getMarbleshopId())
  }

  closePaymentForm() {
    this.isPaymentFormOpened.set(false)
  }
  openPaymentForm() {
    this.isPaymentFormOpened.set(true)
    this.closeExpenseForm()
  }
  closeExpenseForm() {
    this.isExpenseFormOpened.set(false)
  }
  openExpenseForm() {
    this.isExpenseFormOpened.set(true)
    this.closePaymentForm()
  }
  loadExpenses() {
    this.expenses$ = this.expenseService.getAllExpenseFromMarbleshop(this.authService.getMarbleshopId())

  }
  openModal(modalType: string) {
    this.modalType.set(modalType)
    if (this.modalType() == 'transactionType') {
      const transactionTypeDialogRef = this.dialog.open(TransactionTypeDialogComponent, {
        data: {
          title: 'Selecione o tipo de transação',
        }
      })
      transactionTypeDialogRef.afterClosed().subscribe(result => {
        if (result) {
          this.selectTransactionType(result)
          console.log('Selected transaction type:', this.transactionType());
          if (this.transactionType() === 'payment') {
            this.loadOrders()
            this.openPaymentForm()
          }
          if (this.transactionType() == 'expense') {
            this.loadBills()
            this.openExpenseForm()
          }
        }
      });
    }
  }
  confirmModal() {
    if (this.transactionType() == 'payment') {
      this.loadOrders()
      this.openPaymentForm()
    }
    if (this.transactionType() == 'expense') {
      this.openExpenseForm()
    }
  }

  selectTransactionType(transactionType: string) {
    this.transactionType.set(transactionType)
  }

  submitPaymentForm(payment: Payment) {
    this.paymentService.savePayment(payment).subscribe({
      next: () => {
        this.isSaving.set(true);
        this.loadPayments()
        this.closePaymentForm()
      },
      error: (err) => {
        console.error('Error saving payment:', err);
      },
      complete: () => {
        this.isSaving.set(false);
      }
    });
  }

  submitExpenseForm(expense: Expense) {
    this.expenseService.saveExpense(expense).subscribe({
      next: () => {
        this.isSaving.set(true);
        this.loadExpenses()
        this.closeExpenseForm()
      },
      error: (err) => {
        console.error('Error saving expense:', err);
      },
      complete: () => {
        this.isSaving.set(false);
      }
    });
  }
}
