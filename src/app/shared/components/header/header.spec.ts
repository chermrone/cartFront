import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Header } from './header';
import { CardService } from '../../../core/services/card-service';
import { signal } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

class CardServiceStub {
  totalQuantity = signal(3);
}

describe('Header', () => {
  let component: Header;
  let fixture: ComponentFixture<Header>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Header, RouterTestingModule],
      providers: [{ provide: CardService, useClass: CardServiceStub }],
    }).compileComponents();

    fixture = TestBed.createComponent(Header);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('doit afficher le badge avec totalQuantity', () => {
    const btn = fixture.nativeElement.querySelector('button[mat-icon-button]');
    expect(btn.getAttribute('ng-reflect-mat-badge')).toBe('3');
  });
});
