import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { CurrencyConverterComponent } from '../../shared/components/currency-converter/currency-converter.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, CurrencyConverterComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {}
