import { computed, inject, Injectable, signal, Signal } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from './product-service';
import { TaxService } from './tax-service';
import {ProductCategory} from '../models/product-category';

export type ProductView = Product & {
  unitPriceTtc: number;
  unitTaxes: number;
};

@Injectable({ providedIn: 'root' })
export class ProductFacadeService {
  private productService = inject(ProductService);
  private taxService = inject(TaxService);

  // filtre par catégorie
  private readonly selectedCategorySignal = signal<'All' | ProductCategory>('All');

  get selectedCategory(): Signal<'All' | ProductCategory> {
    return this.selectedCategorySignal.asReadonly();
  }

  setCategory(category: 'All' | ProductCategory): void {
    this.selectedCategorySignal.set(category);
  }

  // produits bruts
  private products = this.productService.products;

  // produits filtrés + TTC pour l'UI
  readonly viewProducts: Signal<ProductView[]> = computed(() => {
    const category = this.selectedCategorySignal();
    const items = this.products();

    return items
      .filter(p => category === 'All' || p.category === category)
      .map(p => {
        const unitPriceTtc = this.taxService.getPriceTtc(p.price, p.category, p.isImported);
        const unitTaxes = +(unitPriceTtc - p.price).toFixed(2);
        return {
          ...p,
          unitPriceTtc,
          unitTaxes,
        };
      });
  });
}
