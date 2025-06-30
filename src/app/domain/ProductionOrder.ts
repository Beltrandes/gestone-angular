import { Customer } from "./Customer";
import { ProductionOrderItem } from "./ProductionOrderItem";

export interface ProductionOrder {
  id: string,
  orderId: string,
  customer: Customer
  expectedStartDate: Date,
  expectedEndDate: Date,
  realStartDate: Date,
  realEndDate: Date,
  expectedInstallmentDate: Date,
  productionStatus: ProductionStatus,
  productionPriority: string,
  projectUrl: string,
  notes: string,
  productionOrderItems: ProductionOrderItem[]
}

export enum ProductionStatus {
  PENDING = 'Pendente',
  IN_PROGRESS = 'Em Andamento',
  STOPPED = 'Parado',
  FINISHED = 'Finalizado',
  CANCELED = 'Cancelado'
}

export enum ProductionPriority {
  PENDING = 'Pendente',
  IN_PROGRESS = 'Em Andamento',
  STOPPED = 'Parado',
  FINISHED = 'Finalizado',
  CANCELED = 'Cancelado'
}



