export type Pool = {
  id: number;
  isBasic: boolean;
  pricePerSquareMeter: number;
  objectPrice: number;
  floor: number;
  flatSquare: number;
  kitchenSquare: number;
  hasBalcony: boolean;
  state: string;
};

export * from './types';
