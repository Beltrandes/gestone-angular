import { Customer } from "./Customer";
import { Order } from "./Order";

export interface Payment {
  id: string,
  customer?: Customer,
  details: string,
  payedValue: number,
  paymentType: string,
  marbleshopOrder?: Order,
  createdAt: Date
}
