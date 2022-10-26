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

export enum FurnishQuality {
  WithoutFurnish,
  Municipal,
  Modern,
}

export type DataRow = {
  id: number
} & RequiredData &
  CorrectableData

export type RequiredData = {
  Location: string
  Rooms: number
  Segment: SegmentType
  FloorsCount: number
  WallMaterials: WallMaterials
}

export type CorrectableData = {
  Floor: number
  TotalSpace: number
  KitchenSpace: number
  WithBalcony: boolean
  TimeToMetroInMinutes: number
  FurnishQuality: FurnishQuality
}
