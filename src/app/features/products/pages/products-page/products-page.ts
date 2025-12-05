import {Component, inject} from '@angular/core';

import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {FormsModule} from '@angular/forms';
import {MatFormField, MatInput, MatLabel} from '@angular/material/input';
import {MatButton} from '@angular/material/button';
import {CurrencyPipe} from '@angular/common';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';
import {ProductFacade, ProductView} from '../../../../core/services/product-facade';
import {CardService} from '../../../../core/services/card-service';
import {ProductCategory} from '../../../../core/models/product-category';

@Component({
  selector: 'app-products-page',
  standalone: true,
  imports: [
    MatCardActions,
    FormsModule,
    MatLabel,
    MatFormField,
    MatInput,
    MatButton,
    MatCardContent,
    MatCardSubtitle,
    MatCardTitle,
    MatCardHeader,
    MatCard,
    CurrencyPipe,
    MatSelect,
    MatOption,
    MatSelectModule,
    MatOptionModule
  ],
  templateUrl: './products-page.html',
  styleUrl: './products-page.css',
})
export class ProductsPage {
  private facade = inject(ProductFacade);
  private cartService = inject(CardService);

  products = this.facade.viewProducts;
  selectedCategory = this.facade.selectedCategory;

  // quantité sélectionnée par produit (UI local state)
  selectedQty: Record<number, number> = {};

  onCategoryChange(category: 'All' | ProductCategory): void {
    this.facade.setCategory(category);
  }

  onQtyChange(product: ProductView): void {
    const qty = this.selectedQty[product.id] ?? 0;
    if (qty > product.quantity) {
      this.selectedQty[product.id] = product.quantity;
    }
    if (qty < 1) {
      this.selectedQty[product.id] = 0;
    }
  }

  isAddDisabled(product: ProductView): boolean {
    const qty = this.selectedQty[product.id] ?? 0;
    return qty <= 0 || qty > product.quantity || product.quantity === 0;
  }

  addToCart(product: ProductView): void {
    const qty = this.selectedQty[product.id] ?? 0;
    if (this.isAddDisabled(product)) return;
    this.cartService.addItem(product, qty);
  }
}
