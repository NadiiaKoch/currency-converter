import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { CURRENCIES } from '../../constants/currencies';
import { Currency } from '../../interfaces/currency';
import { CurrencyService } from '../../services/currency.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    MatAutocompleteModule,
  ],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.scss',
})
export class CurrencyConverterComponent implements OnInit, OnDestroy {
  private currencies: Currency[] = CURRENCIES;
  public filteredCurrencies1: Currency[] = [...this.currencies];
  public filteredCurrencies2: Currency[] = [...this.currencies];
  public rates: any;
  public amount1: number = 1;
  public amount2!: number;
  public currency1: string = 'UAH';
  public currency2: string = 'USD';
  public exchangeRate: number | null = 1;

  private destroy$: Subject<void> = new Subject();

  public constructor(private currencyService: CurrencyService) {}

  public ngOnInit(): void {
    this.currencyService
      .getRates()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data) => {
        this.rates = data.rates;
        this.convert();
      });
  }

  public convert(changed?: string): void {
    if (!this.rates) return;

    if (
      changed === 'amount1' ||
      changed === 'currency1' ||
      changed === 'currency2'
    ) {
      this.amount2 = parseFloat(
        (
          this.amount1 *
          (this.rates[this.currency2] / this.rates[this.currency1])
        ).toFixed(2)
      );
    } else if (changed === 'amount2') {
      this.amount1 = parseFloat(
        (
          this.amount2 *
          (this.rates[this.currency1] / this.rates[this.currency2])
        ).toFixed(2)
      );
    } else {
      this.amount2 = parseFloat(
        (
          this.amount1 *
          (this.rates[this.currency2] / this.rates[this.currency1])
        ).toFixed(2)
      );
    }

    this.filteredCurrencies1 = [...this.currencies];
    this.filteredCurrencies2 = [...this.currencies];

    this.exchangeRate = this.rates[this.currency2] / this.rates[this.currency1];
  }

  public swapCurrencies(): void {
    [this.currency1, this.currency2] = [this.currency2, this.currency1];
    this.convert('currency1');
  }

  public filterCurrencies(input: 'currency1' | 'currency2'): void {
    const filterValue =
      input === 'currency1'
        ? this.currency1.toLowerCase()
        : this.currency2.toLowerCase();
    const filtered = this.currencies.filter(
      (currency) =>
        currency.code.toLowerCase().includes(filterValue) ||
        currency.name.toLowerCase().includes(filterValue)
    );

    if (input === 'currency1') {
      this.filteredCurrencies1 = filtered;
    } else {
      this.filteredCurrencies2 = filtered;
    }

    this.exchangeRate = null;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
