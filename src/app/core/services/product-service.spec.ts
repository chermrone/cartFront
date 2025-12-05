import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ProductService } from './product-service';
import { Product } from '../models/product';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  const mockProducts: Product[] = [
    {
      id: 1,
      productName: 'Livre',
      price: 10,
      quantity: 5,
      isImported: false,
      category: 'Books',
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        provideHttpClientTesting()
      ],
    });
    service = TestBed.inject(ProductService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('doit charger les produits au démarrage', () => {
    const req = httpMock.expectOne('products.json');
    expect(req.request.method).toBe('GET');
    req.flush(mockProducts);

    expect(service.products().length).toBe(1);
    expect(service.products()[0].productName).toBe('Livre');
  });
});
