import {Product} from './product';

export interface CartItem {
  product: Product;
  selectedQuantity: number;


  unitPriceHT: number;
  unitPriceTTC: number;
  taxAmount: number;
  totalTaxes: number;
  totalTTC: number;
}

export type ProductCategory = 'Food' | 'Medecine' | 'Books' | 'Electric' | 'Parfum';
