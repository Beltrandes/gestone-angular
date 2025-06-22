import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Expense } from '../domain/Expense';

@Injectable({
  providedIn: 'root'
})
export class ExpenseService {
  private readonly apiUrl = 'http://localhost:8080/api/v1/expense'

  constructor() { }

  http = inject(HttpClient)

  getAllExpenseFromMarbleshop(marbleshopId: string | null) {
    return this.http.get<Expense[]>(`${this.apiUrl}/${marbleshopId}`)
  }

  saveExpense(expense: Expense) {
    if (expense.id) {
      return this.updateExpense(expense)
    } else {
      return this.createExpense(expense)
    }
  }

  private createExpense(expense: Expense) {
    return this.http.post<Expense>(this.apiUrl, expense)
  }

  private updateExpense(expense: Expense) {
    return this.http.put<Expense>(`${this.apiUrl}/${expense.id}`, expense)
  }

}
