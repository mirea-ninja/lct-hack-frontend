interface CellValue<T> {
  value: T;
  change?: number;
}

export type Pool = {
  id: number;
  isBasic: boolean;
  pricePerSquareMeter: CellValue<number>;
  objectPrice: number;
  floor: CellValue<number>;
  flatSquare: CellValue<number>;
  kitchenSquare: CellValue<number>;
  hasBalcony: CellValue<boolean>;
  state: CellValue<string>;
  metro: CellValue<number>;
};

export * from './types';
