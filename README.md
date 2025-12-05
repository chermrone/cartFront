Voici un **README.md propre, complet et professionnel**, adapté pour **Angular 21**, **Standalone**, **Signals**, **Zoneless**, **Angular Material**, **Jest**, et ton architecture actuelle **Products + Cart**.

Tu peux le coller directement dans ton repository Git.

---

# 🛒 Cart Kata – Angular 21 (Standalone • Signals • Zoneless • Material • Jest)

Ce projet est un **kata Angular 21** visant à démontrer une architecture moderne et propre autour d’un catalogue de produits, d’un panier d’achat, d’un filtrage dynamique, et d'une gestion des taxes.
Le projet met l’accent sur les bonnes pratiques **UX/UI**, **accessibilité**, **reactivity avec Signals**, **composants standalone**, et **testing via Jest**.

---

## ✨ Fonctionnalités principales

### 📦 Produits

* Affichage des produits sous forme de cartes.
* Filtrage par catégorie via `mat-select`.
* Affichage des prix HT / TTC + taxes.
* Stock visible et gestion du stock épuisé.
* Sélecteur de quantité avec validation dynamique.
* Bouton *Ajouter au panier* intelligent (désactivé si invalide).

### 🛒 Panier

* Ajout d’articles avec Signal `cardItems`.
* Fusion des quantités si le produit existe déjà.
* Calcul automatique :

  * Total TTC
  * Quantité totale
* Suppression d’un produit du panier.
* Exposition des totaux via `computed()`.

### 🎨 UI / UX / Accessibilité

* UI construite avec **Angular Material**.
* Layout Responsive : grille 3 colonnes → 1 colonne mobile.
* Toast (`MatSnackBar`) lors de l’ajout au panier.
* Labels non tronqués grâce à `floatLabel="always"`.
* A11y :

  * aria-label / aria-labelledby
  * focus, messages toast accessibles
  * contrôle clair des états disabled

### ⚡ Angular moderne

* **Standalone Components**
* **Signals** (`signal`, `computed`)
* **Control Flow syntax** :

  ```html
  @for (...)
  @if (...)
  ```
* **Zoneless** (amélioration performance)
* **Typed Forms / ngModel compatible signals**
* **HttpClient standalone**

---

## 🏗️ Architecture du projet

```
public/
 └── products.json
src/
 ├── app/
 │    ├── features/
 │    │     ├── products/
 │    │     │      ├── products-page.ts
 │    │     │      ├── products-page.html
 │    │     │      ├── products-page.spec.ts
 │    │     │      └── products-page.css
 │    │     └── card/
 │    │            ├── card-page.ts
 │    │            ├── card-page.html
 │    │            ├── card-page.spec.ts 
 │    │            └── card-page.css
 │    ├── core/
 │    │     ├── services/
 │    │     │      ├── product-facade-service.ts
 |    |     |      ├── product-facade-service.spec.ts
 │    │     │      ├── card-service.ts
 │    │     │      ├── card-service.spec.ts
 │    │     │      ├── tax-service.ts
 │    │     │      └── tax-service.spec.ts
 │    │     ├── models/
 │    │     │      ├── product.ts
 │    │     │      ├── product-category.ts
 │    │     │      └── card-item.ts
 |    |     |── constants/
 │    │            └── tax-rates.ts
 │    ├── shared/
 │    │     ├── components/
 │    │     │      └── header/
 │    │     │             ├── header.component.ts
 │    │     │             ├── header.component.html
 |    |     |             ├── header.component.spec.ts
 │    │     │             └── header.component.css
 │    └── app.ts
 │    └── app.html
 |    └── app.spec.ts
 │    └── app.css
 │    └── app.routes.ts
```

---

## 📥 Installation

```bash
npm install
```

---

## ▶️ Démarrer l'application

```bash
npm start
```

L’application sera accessible sur :

```
http://localhost:4200/
```

---

## 🧪 Tests – Jest (Angular 21)

Le projet utilise **Jest** comme framework de tests unitaires, incluant le preset Angular officiel.

### 📌 Lancer les tests

```bash
npm test
```

### 📌 Couverture

```bash
npm run test:coverage
```
---

## 🧠 Points techniques importants

### 🔹 Signals (Angular Reactivity nouvelle génération)

* Remplace `BehaviorSubject` / `RxJS` pour la majorité des cas.
* Mis à jour instantanée du DOM sans zone.js.

### 🔹 Zoneless

* Meilleures performances.
* Requiert une gestion de réactivité propre (signals).

### 🔹 Material Design

* UI cohérente.
* Accessibilité robuste.
* Toast avec `MatSnackBar` :

```ts
this.snackBar.open(`${name} ajouté au panier`, 'OK', { duration: 3000 });
```

### 🔹 Architecture "Clean"

* `ProductFacade` gère le filtrage + exposition du catalogue.
* `CardService` encapsule toute la logique du panier.
* `TaxService` calcule les prix TTC/taxes.

---

## 👤 Auteur

Développé dans le cadre d’une évaluation technique / kata Angular avancé.
