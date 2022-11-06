export interface Column {
  id: keyof RequiredData | keyof CorrectableData
  label: string
  minWidth?: number
  align?: "right"
  format?: (value: number) => string
}

export enum SegmentType {
  New,
  Modern,
  Old,
}

export enum WallMaterials {
  Brick,
  Panel,
  Monolith,
}

export enum RepairType {
  WithoutRepair,
  MunicipalRepair,
  ModernRepair,
}

export type DataRow = {
  id: number
  guid: string
} & RequiredData &
  CorrectableData

export type RequiredData = {
  Location?: string
  Rooms?: number
  Segment?: SegmentType
  FloorsCount?: number
  WallMaterials?: WallMaterials
}

export type CorrectableData = {
  Floor?: number
  AptArea?: number
  KitchenArea?: number
  HasBalcony?: boolean
  ToMetro?: number
  RepairType?: RepairType
}

export * from "./types"
