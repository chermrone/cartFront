import {Product} from './product';

export interface ProductPage {
  items: Product[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
