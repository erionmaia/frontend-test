import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TickerDisplayComponent } from './ticker-display.component';
import { BinanceService } from '../../services/binance.service';
import { of } from 'rxjs';
import { Ticker } from '../../interfaces/ticker.interface';

const mockTicker: Ticker = {
  e: '24hrTicker', E: 0, s: 'BTCUSDT', p: '0', P: '0.1', w: '0', x: '0', c: '100', Q: '0', b: '99', B: '0', a: '101', A: '0', o: '0', h: '0', l: '0', v: '0', q: '0', O: 0, C: 0, F: 0, L: 0, n: 0
};

class MockBinanceService {
  connect = jasmine.createSpy('connect');
  getTickerUpdates() { return of(mockTicker); }
}

describe('TickerDisplayComponent', () => {
  let component: TickerDisplayComponent;
  let fixture: ComponentFixture<TickerDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TickerDisplayComponent],
      imports: [MatCardModule, MatTableModule, BrowserAnimationsModule],
      providers: [
        { provide: BinanceService, useClass: MockBinanceService }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TickerDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render ticker data', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.textContent).toContain('BTCUSDT');
    expect(compiled.textContent).toContain('100');
  });
});