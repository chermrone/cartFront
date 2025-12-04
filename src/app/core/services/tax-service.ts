// tax.service.ts
import { Injectable } from '@angular/core';
import { TAX_RATES } from '../constants/tax-rates';

@Injectable({ providedIn: 'root' })
export class TaxService {

  /**
   * Calcul du prix TTC à partir des seules infos nécessaires.
   */
  getPriceTtc(priceHt: number, category: string, imported: boolean): number {
    const taxes = this.getTaxes(priceHt, category, imported);
    const totalTax = taxes.reduce((sum, t) => sum + t, 0);
    return +(priceHt + totalTax).toFixed(2);
  }


  // avoir le bon taxe selon la catégorie et si importé
  private getTaxes(priceHt: number, category: string, imported: boolean): number[] {
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

  private getBaseRate(category: string): number {
    const c = (category || '').toLowerCase();

    switch (category) {
      case 'food':
      case 'medecine':
        return TAX_RATES.UNTAXED;
      case 'books':
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
