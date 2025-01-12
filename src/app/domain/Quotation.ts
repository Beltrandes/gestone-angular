import { Customer } from "./Customer";
import { MarbleshopItem } from "./MarbleshopItem";
import { MarbleshopUser } from "./MarbleshopUser";
import { MiscellaneousItem } from "./MiscellaneousItem";

export interface Quotation {
  id: string,
  name: string,
  details: string,
  address: string,
  deadlineDays: string,
  daysForDue: string,
  totalValue: number,
  totalArea: number,
  quotationStatus: string,
  customer: Customer,
  marbleshopUser: MarbleshopUser
  marbleshopItems: MarbleshopItem[]
  miscellaneousItems: MiscellaneousItem[]
  createdAt: Date
}
