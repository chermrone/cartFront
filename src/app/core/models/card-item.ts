import {Product} from './product';

export interface CardItem {
  productItem: Product;
  selectedQuantity: number;

  unitPriceHT: number;
  unitTaxes: number;
  unitPriceTTC: number;
}
