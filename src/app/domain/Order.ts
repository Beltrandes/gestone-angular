import { Customer } from "./Customer"
import { MarbleshopItem } from "./MarbleshopItem"
import { MiscellaneousItem } from "./MiscellaneousItem"
import { Payment } from "./Payment"

export interface Order {
  id: string,
  localId: number,
  details: string,
  workAddress: string,
  discount: number,
  totalValue: number,
  totalArea: number,
  finalValue: string,
  totalPaid: number,
  marbleshopOrderStatus: string,
  customer: Customer,
  marbleshopItems: MarbleshopItem[],
  miscellaneousItems: MiscellaneousItem[],
  payments: Payment[],
  estimatedInstallmentDate: Date,
  paymentStatus: string,
  installmentDate: Date,
  notes: string,
  createdAt: Date,
  updatedAt: Date
}
