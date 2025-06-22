import { Expense } from "./Expense";

export interface Bill {
  id: string;
  name: string;
  description: string;
  totalValue: number;
  paidValue: number;
  dueDate: Date;
  paymentDate: Date;
  status: string;
  category: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  expenses: Expense[]
}
