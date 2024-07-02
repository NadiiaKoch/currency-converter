import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-currency-header',
  standalone: true,
  imports: [CommonModule, MatToolbarModule],
  templateUrl: './currency-header.component.html',
  styleUrl: './currency-header.component.scss',
})
export class CurrencyHeaderComponent implements OnInit {
  public rates: any;
  private destroy$: Subject<void> = new Subject();

  public constructor(private currencyService: CurrencyService) {}

  public ngOnInit(): void {
    this.currencyService
      .getRates()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.rates = data.rates;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
