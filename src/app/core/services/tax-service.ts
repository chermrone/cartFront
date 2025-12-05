// tax.service.ts
import { Injectable } from '@angular/core';
import { TAX_RATES } from '../constants/tax-rates';
import {ProductCategory} from '../models/product-category';

@Injectable({ providedIn: 'root' })
export class TaxService {

  /**
   * Calcul du prix TTC à partir des seules infos nécessaires.
   */
  getPriceTtc(priceHt: number, category: ProductCategory, imported: boolean): number {
    const taxes = this.getTaxes(priceHt, category, imported);
    const totalTax = taxes.reduce((sum, t) => sum + t, 0);
    return +(priceHt + totalTax).toFixed(2);
  }


  // avoir le bon taxe selon la catégorie et si importé
  private getTaxes(priceHt: number, category: ProductCategory, imported: boolean): number[] {
    // Liste des taxes applicables
    const taxes: number[] = [];

    // Taxe de base
    const baseRate = this.getBaseRate(category);
    if (baseRate > 0) {
      taxes.push(this.roundTo5CentsUp(priceHt * baseRate));
    }

    // Taxe d'import
    if (imported) {
      taxes.push(this.roundTo5CentsUp(priceHt * TAX_RATES.IMPORTED));
    }

    return taxes;
  }

  private getBaseRate(category: ProductCategory): number {
    switch (category) {
      case 'Food':
      case 'Medecine':
        return TAX_RATES.UNTAXED;
      case 'Books':
        return TAX_RATES.BOOKS;
      default:
        return TAX_RATES.OTHER;
    }
  }


  // Arrondi aux 5 centimes supérieurs
  private roundTo5CentsUp(amount: number): number {
    return Math.ceil(amount * 20) / 20;
  }
}
