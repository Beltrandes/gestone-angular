import { Customer } from "./Customer";
import { Order } from "./Order";

export interface Payment {
  id: string,
  customer?: Customer,
  customerName?: Customer,
  details: string,
  payedValue: number,
  paymentType: string,
  marbleshopOrder?: Order,
  orderFinalValue?: number,
  orderPaymentStatus?: string,
  paymentDate?: Date,
  createdAt: Date
}
