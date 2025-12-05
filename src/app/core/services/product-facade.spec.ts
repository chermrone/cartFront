import { TestBed } from '@angular/core/testing';
import { ProductFacadeService} from './product-facade-service';
import { ProductService } from './product-service';
import { TaxService } from './tax-service';
import { signal } from '@angular/core';
import { Product } from '../models/product';

class ProductServiceStub {
  products = signal<Product[]>([
    {
      id: 1,
      productName: 'Livre',
      price: 10,
      quantity: 5,
      isImported: false,
      category: 'Books',
    },
    {
      id: 2,
      productName: 'Parfum',
      price: 20,
      quantity: 3,
      isImported: true,
      category: 'Parfum',
    },
  ]);
}

describe('ProductFacade', () => {
  let facade: ProductFacadeService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductFacadeService,
        TaxService,
        { provide: ProductService, useClass: ProductServiceStub },
      ],
    });
    facade = TestBed.inject(ProductFacadeService);
  });

  it('doit retourner tous les produits quand la catégorie = All', () => {
    facade.setCategory('All');
    const products = facade.viewProducts();
    expect(products.length).toBe(2);
  });

  it('doit filtrer par catégorie', () => {
    facade.setCategory('Books');
    const products = facade.viewProducts();
    expect(products.length).toBe(1);
    expect(products[0].category).toBe('Books');
  });

  it('doit enrichir les produits avec unitPriceTtc et unitTaxes', () => {
    facade.setCategory('All');
    const [first] = facade.viewProducts();
    expect(first.unitPriceTtc).toBeDefined();
    expect(first.unitTaxes).toBeDefined();
  });
});
