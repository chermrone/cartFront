import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CardPage } from './card-page';
import { CardService } from '../../../../core/services/card-service';
import { signal } from '@angular/core';
import { CardItem } from '../../../../core/models/card-item';

class CardServiceStub {
  cardItems = signal<CardItem[]>([]);
  totalTtc = signal(0);
  removeItem = jest.fn();
}

describe('CardPage', () => {
  let component: CardPage;
  let fixture: ComponentFixture<CardPage>;
  let cardService: CardServiceStub;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPage],
      providers: [{ provide: CardService, useClass: CardServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(CardPage);
    component = fixture.componentInstance;
    cardService = TestBed.inject(CardService) as unknown as CardServiceStub;
  });

  it('doit afficher "Panier vide" quand aucun article', () => {
    cardService.cardItems.set([]);
    fixture.detectChanges();

    const msg = fixture.nativeElement.querySelector('.empty-cart');
    expect(msg.textContent).toContain('Panier vide');
  });

  it('doit afficher une ligne quand il y a un article', () => {
    cardService.cardItems.set([
      {
        productItem: {
          id: 1,
          productName: 'Livre',
          price: 10,
          quantity: 5,
          isImported: false,
          category: 'Books',
        },
        selectedQuantity: 2,
        unitPriceHT: 10,
        unitTaxes: 1,
        unitPriceTTC: 11,
      },
    ]);
    cardService.totalTtc.set(22);
    fixture.detectChanges();

    const rows = fixture.nativeElement.querySelectorAll('tr.mat-row');
    expect(rows.length).toBe(1);
    expect(rows[0].textContent).toContain('Livre');
  });

  it('doit appeler removeItem quand on clique sur la poubelle', () => {
    cardService.cardItems.set([
      {
        productItem: {
          id: 1,
          productName: 'Livre',
          price: 10,
          quantity: 5,
          isImported: false,
          category: 'Books',
        },
        selectedQuantity: 2,
        unitPriceHT: 10,
        unitTaxes: 1,
        unitPriceTTC: 11,
      },
    ]);
    fixture.detectChanges();

    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('button[color="warn"]');
    btn.click();
    expect(cardService.removeItem).toHaveBeenCalled();
  });
});
