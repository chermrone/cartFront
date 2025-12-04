import { Routes } from '@angular/router';

export const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full' },
  {path: 'cart', loadComponent: () => import('./features/card/pages/card-page/card-page').then(m => m.CardPage)},
  {path: 'products', loadComponent: () => import('./features/products/pages/products-page/products-page').then(m => m.ProductsPage)},
/*
  {path: '**', redirectTo: 'products' }
*/
];
