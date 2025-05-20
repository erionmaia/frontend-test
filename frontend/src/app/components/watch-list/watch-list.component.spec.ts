import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WatchListComponent } from './watch-list.component';
import { BinanceService } from '../../services/binance.service';

class MockBinanceService {
  subscribeToSymbol = jasmine.createSpy('subscribeToSymbol');
  unsubscribeFromSymbol = jasmine.createSpy('unsubscribeFromSymbol');
  getSubscribedSymbols() { return []; }
}

describe('WatchListComponent', () => {
  let component: WatchListComponent;
  let fixture: ComponentFixture<WatchListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [WatchListComponent],
      imports: [
        ReactiveFormsModule,
        MatCardModule,
        MatFormFieldModule,
        MatSelectModule,
        MatButtonModule,
        MatIconModule,
        MatListModule,
        BrowserAnimationsModule
      ],
      providers: [
        { provide: BinanceService, useClass: MockBinanceService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WatchListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should add a symbol', () => {
    component.watchListForm.setValue({ symbol: 'BTCUSDT' });
    component.addSymbol();
    expect(component.selectedSymbols).toContain('BTCUSDT');
  });

  it('should remove a symbol', () => {
    component.selectedSymbols = ['BTCUSDT'];
    component.removeSymbol('BTCUSDT');
    expect(component.selectedSymbols).not.toContain('BTCUSDT');
  });
});