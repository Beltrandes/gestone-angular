import { Component, inject, signal } from '@angular/core';
import { ControllerComponent } from "../../components/controller/controller.component";
import { BillFormComponent } from "../../components/bill-form/bill-form.component";
import { BillListComponent } from "../../components/bill-list/bill-list.component";
import { Observable } from 'rxjs';
import { Bill } from '../../domain/Bill';
import { BillService } from '../../services/bill.service';
import { AuthService } from '../../services/auth.service';
import { AsyncPipe } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { AddExpenseDialogComponent } from '../../components/add-expense-dialog/add-expense-dialog.component';
import { ExpenseService } from '../../services/expense.service';

@Component({
  selector: 'app-bill',
  imports: [ControllerComponent, BillFormComponent, BillListComponent, AsyncPipe, MatIconModule],
  templateUrl: './bill.component.html',
  styleUrl: './bill.component.sass'
})
export class BillComponent {

  bills$!: Observable<Bill[]>;
  isSaving = signal(false);
  isBillFormOpened = signal(false);
  billService = inject(BillService);
  editingBill = signal<Bill | null>(null);
  dialog = inject(MatDialog);
  expenseService = inject(ExpenseService)

  authService = inject(AuthService)

  closeBillForm() {
    this.isBillFormOpened.set(false);
  }
  openBillForm() {
    this.isBillFormOpened.set(true);
  }

  loadBills() {
    this.bills$ = this.billService.getAllBillFromMarbleshop(this.authService.getMarbleshopId());
  }

  constructor() {
    this.loadBills();
  }

  submitBillForm(bill: Bill) {
    this.billService.saveBill(bill).subscribe(() => {
      this.isBillFormOpened.set(false);
    });
  }

  editBill(bill: Bill) {
    this.editingBill.set(bill);
    this.isBillFormOpened.set(true);
  }

  openDeleteBillModal(bill: Bill) {
    throw new Error('Method not implemented.');
  }

  openAddExpenseDialog(bill: Bill) {
    const addExpenseDialogRef = this.dialog.open(AddExpenseDialogComponent, {
      data: {
        bill: bill
      }
    })
    addExpenseDialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.expenseService.saveExpense(result).subscribe(() => {
          this.loadBills();
        })
      }
    });
  }
}
