import {inject, Injectable, Signal, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Product } from '../models/product';
import { ProductQuery } from '../models/product-query';
import { ProductPage } from '../models/product-page';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly productsUrl = 'products.json';
  private http = inject(HttpClient);
  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$ = this.productsSubject.asObservable();

  private productsSignal = signal<Product[]>([]);


  constructor() {
    this.loadProducts(); // charge au démarrage
  }

  // Exposer le signal en lecture seule
  get products(): Signal<Product[]> {
    return this.productsSignal;
  }

  /**
   * Charge les produits depuis le fichier JSON
   */
  private loadProducts(): void {
    this.http.get<Product[]>(this.productsUrl)
      .pipe(
        tap(products => console.log('Produits chargés dans le service:', products))
      )
      .subscribe({
        next: (products) => this.productsSignal.set(products),
        error: (error) => console.error('Erreur chargement produits:', error)
      });
  }





  // Met à jour la quantité d'un produit de façon immuable et propage l'état
  /*updateQuantity(id: number, delta: number): boolean {
    const current = this.productsSignal();
    const idx = current.findIndex((p) => p.id === id);
    if (idx === -1) return false;

    const product = current[idx];
    const updated: Product = { ...product, quantity: Math.max(0, product.quantity + delta) };
    const next = [...current];
    next[idx] = updated;

    this.productsSignal.set(next);
    this.productsSubject.next(next);
    return true;
  }

  // Exécute une requête (filtre, tri, pagination) et retourne une page
  query(query?: ProductQuery): ProductPage {
    const all = [...this.productsSignal()]; // copie pour opérations
    let filtered = all;

    // Filtre par catégorie si spécifié et différent de 'ALL'
    if (query?.category && query.category !== 'ALL') {
      filtered = filtered.filter((p) => p.category === query.category);
    }

    // Tri
    if (query?.sortBy) {
      const dir = query.sortDirection === 'desc' ? -1 : 1;
      filtered = filtered.slice().sort((a: any, b: any) => {
        const aVal = a[query.sortBy!];
        const bVal = b[query.sortBy!];
        if (aVal == null && bVal == null) return 0;
        if (aVal == null) return -1 * dir;
        if (bVal == null) return 1 * dir;

        if (typeof aVal === 'string' && typeof bVal === 'string') {
          return aVal.localeCompare(bVal) * dir;
        }
        return (aVal > bVal ? 1 : aVal < bVal ? -1 : 0) * dir;
      });
    }

    // Pagination
    const page = Math.max(1, query?.page ?? 1);
    const pageSize = Math.max(1, query?.pageSize ?? 10);
    const totalItems = filtered.length;
    const totalPages = Math.max(1, Math.ceil(totalItems / pageSize));
    const start = (page - 1) * pageSize;
    const items = filtered.slice(start, start + pageSize);

    return {
      items,
      page,
      pageSize,
      totalItems,
      totalPages,
    };
  }*/
}
