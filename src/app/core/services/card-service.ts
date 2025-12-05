import { inject, Injectable, signal, Signal, computed } from '@angular/core';
import { CardItem } from '../models/./card-item';
import { Product } from '../models/product';
import { TaxService } from './tax-service';

@Injectable({ providedIn: 'root' })
export class CardService {
  private taxService = inject(TaxService);
  private readonly cardItemsSignal = signal<CardItem[]>([]);

  get cardItems(): Signal<CardItem[]> {
    return this.cardItemsSignal.asReadonly();
  }

  // construit un CardItem à partir d'un Product et d'une quantité
  // en calculant les prix TTC et les taxes unitaires
  // retourne productItem avec les infos de prix (unitPriceHT, unitPriceTTC, unitTaxes) et la quantité sélectionnée
  private buildCartItem(productItem: Product, quantity: number): CardItem {
    const unitPriceHT = productItem.price;
    const unitPriceTTC = this.taxService.getPriceTtc(
      productItem.price,
      productItem.category,
      productItem.isImported
    );
    const unitTaxes = +(unitPriceTTC - unitPriceHT).toFixed(2);

    return {
      productItem,
      selectedQuantity: quantity,
      unitPriceHT,
      unitTaxes,
      unitPriceTTC,
    };
  }

  // ajoute un produit au panier avec la quantité spécifiée
  // si le produit existe déjà, incrémente la quantité
  // ignore si la quantité est <= 0
  addItem(productItem: Product, quantity: number): void {
    if (quantity <= 0) return;

    this.cardItemsSignal.update(items => {
      const index = items.findIndex(ci => ci.productItem.id === productItem.id);

      if (index >= 0) {
        const updated = [...items];
        const current = updated[index];

        updated[index] = {
          ...current,
          selectedQuantity: current.selectedQuantity + quantity,
        };

        return updated;
      }

      const newItem = this.buildCartItem(productItem, quantity);
      return [...items, newItem];
    });
  }

  // calcule le total TTC du panier
  // utilisé par card-page pour l'affichage
  // reduce est utilisé pour sommer les totaux TTC de chaque item
  readonly totalTtc: Signal<number> = computed(() =>
    this.cardItemsSignal().reduce(
      (sum, item) => sum + item.unitPriceTTC * item.selectedQuantity,
      0
    )
  );

  readonly totalQuantity: Signal<number> = computed(() =>
    this.cardItemsSignal().reduce(
      (sum, item) => sum + item.selectedQuantity,
      0
    )
  );

  removeItem(productId: number): void {
    this.cardItemsSignal.update(items =>
      items.filter(item => item.productItem.id !== productId)
    );
  }

}
