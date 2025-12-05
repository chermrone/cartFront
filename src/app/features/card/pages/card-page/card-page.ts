import { Component, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { MatCard, MatCardContent, MatCardTitle } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {CardService} from '../../../../core/services/card-service';
import {CardItem} from '../../../../core/models/card-item';
import {MatDialog} from '@angular/material/dialog';
import {
  ConfirmDeleteData,
  ConfirmDialogComponent
} from '../../../../shared/components/confirm-dialog/confirm-dialog';

@Component({
  selector: 'app-card-page',
  standalone: true,
  imports: [
    CurrencyPipe,
    MatCard,
    MatCardContent,
    MatCardTitle,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './card-page.html',
  styleUrl: './card-page.css',
})
export class CardPage {
  private cardService = inject(CardService);
  private dialog = inject(MatDialog)

  cardItems = this.cardService.cardItems;
  totalTtc = this.cardService.totalTtc;

  displayedColumns: string[] = [
    'name',
    'quantity',
    'unitPriceHT',
    'unitPriceTTC',
    'unitTaxes',
    'totalTaxes',
    'totalTTC',
    'actions',
  ];

  getItemTotalTaxes(item: CardItem): number {
    return +(item.unitTaxes * item.selectedQuantity).toFixed(2);
  }

  getItemTotalTtc(item: CardItem): number {
    return +(item.unitPriceTTC * item.selectedQuantity).toFixed(2);
  }

  removeItem(item: CardItem): void {
    const productName = item.productItem.productName || 'cet article';

    const dialogRef = this.dialog.open<ConfirmDialogComponent, ConfirmDeleteData, boolean>(
      ConfirmDialogComponent,
      {
        data: { name: productName },
        width: '320px',
        ariaDescribedBy: 'confirm-delete-description',
      }
    );

    dialogRef.afterClosed().subscribe(confirmed => {
      if (confirmed) {
        this.cardService.removeItem(item.productItem.id);
      }
    });
  }

}
