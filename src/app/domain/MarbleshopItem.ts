import { MarbleshopMaterial } from "./MarbleshopMaterial";
import { MarbleshopSubItem } from "./MarbleshopSubItem";

export interface MarbleshopItem {
  id: string,
  name: string,
  description: string,
  measureX: number,
  measureY: number,
  unitValue: number,
  unitArea: number,
  totalValue: number,
  totalArea: number,
  quantity: number,
  marbleshopItemType: string
  marbleshopMaterial: MarbleshopMaterial
  marbleshopSubItems: MarbleshopSubItem[]
}
