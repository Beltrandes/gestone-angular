export interface Bill {
  id: string;
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
}
