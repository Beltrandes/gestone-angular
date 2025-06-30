import { ProductionOrderItem } from "./ProductionOrderItem";
import { Slab } from "./Slab";

export interface SlabMovement {
  id: string,
  productionOrderItem: ProductionOrderItem,
  slab: Slab,
  areaMoved: number,
  createdAt: Date,
  movementType: string,
  notes: string
}
