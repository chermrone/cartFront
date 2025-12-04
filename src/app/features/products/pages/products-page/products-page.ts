import {Component, computed, effect, inject, OnInit, signal} from '@angular/core';
import {ProductService} from '../../../../core/services/product-service';

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
import {TaxService} from '../../../../core/services/tax-service';
import {Product} from '../../../../core/models/product';
import {ProductCategory} from '../../../../core/models/cart-item';
import {MatOption, MatSelect, MatSelectModule} from '@angular/material/select';
import {MatOptionModule} from '@angular/material/core';

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
  private productService = inject(ProductService);
  private taxService = inject(TaxService);
  products = this.productService.products;
  selectedQty: Record<number, number> = {};
  selectedCategory = signal<'All' | ProductCategory>('All');

  filteredProducts = computed(() => {
    const category = this.selectedCategory();
    const list = this.products();

    if (category === 'All') return list;

    return list.filter(p => p.category === category);
  });

  // Produit enrichi avec priceTtc (signal calculé)
  productsWithTtc = computed(() =>
    this.products().map((p: Product) => ({
      ...p,
      priceTtc: this.taxService.getPriceTtc(p.price, p.category, p.isImported)
    }))
  );

  onQtyChange(product: Product) {
    const qty = this.selectedQty[product.id] ?? 0;
    if (qty > product.quantity) this.selectedQty[product.id] = product.quantity;
    if (qty < 1) this.selectedQty[product.id] = 0;
  }

  isAddDisabled(product: Product): boolean {
    const qty = this.selectedQty[product.id] ?? 0;
    return qty <= 0 || qty > product.quantity;
  }

  addToCart(product: Product) {
    const qty = this.selectedQty[product.id] ?? 0;
    if (this.isAddDisabled(product)) return;

    console.log('Ajout au panier', product.productName, 'x', qty);
  }
}
