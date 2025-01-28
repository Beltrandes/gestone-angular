import { MiscellaneousMaterial } from "./MiscellaneousMaterial";

export interface MiscellaneousItem {
  id: string,
  name: string,
  details: string,
  quantity: number,
  unitValue: number,
  totalValue: number,
  miscellaneousMaterial: MiscellaneousMaterial
  miscellaneousItemType: string
}
