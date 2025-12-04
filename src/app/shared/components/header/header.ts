import { Component } from '@angular/core';
import {MatToolbar} from '@angular/material/toolbar';
import {MatBadge} from '@angular/material/badge';
import {MatIcon} from '@angular/material/icon';
import {AsyncPipe} from '@angular/common';
import {Observable, of} from 'rxjs';
import {MatButton, MatIconButton} from '@angular/material/button';
import {RouterLink, RouterLinkActive} from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [
    MatToolbar,
    MatBadge,
    MatIcon,
    AsyncPipe,
    MatButton,
    RouterLink,
    RouterLinkActive,
    MatIconButton
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class Header {
  protected totalQuantity$: Observable<number> = of(3) ;

}
