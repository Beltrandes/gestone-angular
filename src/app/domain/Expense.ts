export interface Expense {
  id: string;
  details: string;
  paidValue: number;
  paymentDate: Date;
  paymentType: string;
  createdAt: Date;
  billName?: string;
  billTotalValue?: string;
  billStatus?: string;
  billCategory?: string;
  billDescription?: string;
  billId: string;
}
