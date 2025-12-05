import {Component, inject} from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatBadge} from '@angular/material/badge';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {Observable, of} from 'rxjs';
import {MatButton, MatIconButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {CardService} from '../../../core/services/card-service';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatBadge,
    MatIcon,
    MatButton,
    RouterLink,
    RouterLinkActive,
    MatIconButton
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  private cartService = inject(CardService)
  protected totalQuantity = this.cartService.totalQuantity;

}
