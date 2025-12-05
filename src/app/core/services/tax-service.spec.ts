import { TestBed } from '@angular/core/testing';
import { TaxService } from './tax-service';
import { ProductCategory } from '../models/product-category';

describe('TaxService', () => {
  let service: TaxService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TaxService],
    });
    service = TestBed.inject(TaxService);
  });

  it('doit retourner Pht pour Food (0% taxe)', () => {
    const price = 10;
    const result = service.getPriceTtc(price, 'Food', false);
    expect(result).toBe(10);
  });

  it('doit appliquer 10% sur Books sans import', () => {
    const price = 10;
    const result = service.getPriceTtc(price, 'Books', false);
    // 10% de 10 = 1 → arrondi 1,00
    expect(result).toBe(11);
  });

  it('doit appliquer 20% sur Electric + 5% import', () => {
    const price = 10;
    const result = service.getPriceTtc(price, 'Electric', true);
    // TVA: 20% -> 2,00 ; import: 5% -> 0,50 → total 12,50
    expect(result).toBe(12.5);
  });

  it('doit arrondir chaque taxe aux 0,05 supérieurs', () => {
    // pour vérifier l'arrondi, on peut choisir un prix qui génère une taxe non multiple de 0,05
    const price = 9.99;
    const result = service.getPriceTtc(price, 'Books', false);
    // 10% de 9.99 = 0.999 → arrondi à 1.00 → 10.99
    expect(result).toBe(10.99);
  });
});
