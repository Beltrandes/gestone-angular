import { MarbleshopItem } from "./MarbleshopItem";
import { ProductionOrder } from "./ProductionOrder";
import { SlabMovement } from "./SlabMovement";

export interface ProductionOrderItem {
  id: string,
  productionOrder: ProductionOrder,
  marbleshopItem: MarbleshopItem,
  slabMovements: SlabMovement[],
  status: ProductionOrderItemStatus,
  notes: string
}

export enum ProductionOrderItemStatus {
  WAITING_FOR_CUT = 'Aguardando Corte',
  CUT = 'Cortado',
  FINISHING = 'Finalizando',
  PRODUCED = 'Produzido'
}
