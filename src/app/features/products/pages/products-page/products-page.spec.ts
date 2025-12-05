import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ProductsPage } from './products-page';
import { ProductFacade } from '../../../../core/services/product-facade';
import { CardService } from '../../../../core/services/card-service';
import { signal } from '@angular/core';
import { ProductView } from '../../../../core/services/product-facade';

class ProductFacadeStub {
  viewProducts = signal<ProductView[]>([
    {
      id: 1,
      productName: 'Livre',
      price: 10,
      quantity: 5,
      isImported: false,
      category: 'Books',
      unitPriceTtc: 11,
      unitTaxes: 1,
    },
  ]);
  selectedCategory = signal<'All' | any>('All');
  setCategory = jest.fn();
}

class CardServiceStub {
  addItem = jest.fn();
}

describe('ProductsPage', () => {
  let component: ProductsPage;
  let fixture: ComponentFixture<ProductsPage>;
  let facade: ProductFacadeStub;
  let cardService: CardServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductsPage],
      providers: [
        { provide: ProductFacade, useClass: ProductFacadeStub },
        { provide: CardService, useClass: CardServiceStub },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductsPage);
    component = fixture.componentInstance;
    facade = TestBed.inject(ProductFacade) as unknown as ProductFacadeStub;
    cardService = TestBed.inject(CardService) as unknown as CardServiceStub;
    fixture.detectChanges();
  });

  it('doit afficher au moins une card produit', () => {
    const card = fixture.nativeElement.querySelector('mat-card');
    expect(card).toBeTruthy();
    expect(card.textContent).toContain('Livre');
  });

  it('doit appeler setCategory quand la catégorie change', () => {
    component.onCategoryChange('Books' as any);
    expect(facade.setCategory).toHaveBeenCalledWith('Books');
  });

  it('doit appeler addItem du CardService quand addToCart est cliqué', () => {
    component.selectedQty[1] = 2;
    const button: HTMLButtonElement = fixture.nativeElement.querySelector('button[mat-raised-button]');
    button.click();
    expect(cardService.addItem).toHaveBeenCalledWith(
      expect.objectContaining({ id: 1 }),
      2
    );
  });
});
