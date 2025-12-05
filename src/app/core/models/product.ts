import {ProductCategory} from './product-category';

export interface Product {
  id: number;
  productName: string;
  price: number;
  quantity: number;
  isImported: boolean;
  category: ProductCategory;
}
