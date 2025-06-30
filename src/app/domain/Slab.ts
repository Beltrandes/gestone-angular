import { MarbleshopMaterial } from "./MarbleshopMaterial";
import { SlabMovement } from "./SlabMovement";

export interface Slab {
  id: string,
  material: MarbleshopMaterial,
  densityMeasure: number,
  measureX: number,
  measureY: number,
  quantity: number,
  area: number,
  quality: string,
  entryDate: Date,
  createdAt: Date,
  updatedAt: Date
  slabMovements: SlabMovement[]
}


