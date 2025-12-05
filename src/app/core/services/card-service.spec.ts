import { TestBed } from '@angular/core/testing';
import { CardService } from './card-service';
import { TaxService } from './tax-service';
import { Product } from '../models/product';

describe('CardService', () => {
  let service: CardService;
  let taxService: TaxService;

  const productA: Product = {
    id: 1,
    productName: 'Livre',
    price: 10,
    quantity: 100,
    isImported: false,
    category: 'Books',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CardService, TaxService],
    });
    service = TestBed.inject(CardService);
    taxService = TestBed.inject(TaxService);
  });

  it('doit ajouter un nouvel article dans le panier', () => {
    service.addItem(productA, 2);

    const items = service.cardItems();
    expect(items.length).toBe(1);
    expect(items[0].productItem.id).toBe(1);
    expect(items[0].selectedQuantity).toBe(2);
  });

  it('doit incrémenter la quantité si le produit existe déjà', () => {
    service.addItem(productA, 1);
    service.addItem(productA, 3);

    const items = service.cardItems();
    expect(items.length).toBe(1);
    expect(items[0].selectedQuantity).toBe(4);
  });

  it('ne doit rien faire si quantity <= 0', () => {
    service.addItem(productA, 0);
    expect(service.cardItems().length).toBe(0);
  });

  it('doit calculer totalTtc en fonction des items', () => {
    service.addItem(productA, 2);
    const unitPriceTtc = taxService.getPriceTtc(
      productA.price,
      productA.category,
      productA.isImported
    );
    expect(service.totalTtc()).toBe(unitPriceTtc * 2);
  });

  it('doit calculer totalQuantity', () => {
    service.addItem(productA, 2);
    expect(service.totalQuantity()).toBe(2);
  });

  it('doit supprimer un article via removeItem', () => {
    service.addItem(productA, 2);
    service.removeItem(productA.id);

    expect(service.cardItems().length).toBe(0);
    expect(service.totalQuantity()).toBe(0);
  });
});
