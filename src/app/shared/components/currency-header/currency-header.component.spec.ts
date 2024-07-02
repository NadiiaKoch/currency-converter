import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencyHeaderComponent } from './currency-header.component';

describe('CurrencyHeaderComponent', () => {
  let component: CurrencyHeaderComponent;
  let fixture: ComponentFixture<CurrencyHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CurrencyHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CurrencyHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
