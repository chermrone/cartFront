import {ProductCategory} from './cart-item';
import {SortDirection} from '@angular/material/sort';

export interface ProductQuery {
  category?: ProductCategory | 'ALL';
  page?: number;
  pageSize?: number;
  sortBy?: 'productName' | 'price' | 'quantity' | 'category';
  sortDirection?: SortDirection;
}
