import {inject, Injectable, Signal, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
// ce service charge les produits depuis un fichier JSON et expose un signal en lecture seule
export class ProductService {
  private readonly productsUrl = 'products.json';
  private http = inject(HttpClient);
  private readonly productsSignal = signal<Product[]>([]);


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
      .subscribe({
        next: (products) => this.productsSignal.set(products),
        error: (error) => console.error('Erreur chargement produits:', error)
      });
  }
}
