import { TestBed } from '@angular/core/testing';
import { BinanceService } from './binance.service';
import { Ticker } from '../interfaces/ticker.interface';

describe('BinanceService', () => {
  let service: BinanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BinanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should subscribe and unsubscribe to symbol', () => {
    service.connect = () => {};
    service.subscribeToSymbol('BTCUSDT');
    expect(service.getSubscribedSymbols()).toContain('BTCUSDT');
    service.unsubscribeFromSymbol('BTCUSDT');
    expect(service.getSubscribedSymbols()).not.toContain('BTCUSDT');
  });

  it('should emit ticker updates', (done) => {
    const testTicker: Ticker = {
      e: '24hrTicker', E: 0, s: 'BTCUSDT', p: '0', P: '0.1', w: '0', x: '0', c: '100', Q: '0', b: '99', B: '0', a: '101', A: '0', o: '0', h: '0', l: '0', v: '0', q: '0', O: 0, C: 0, F: 0, L: 0, n: 0
    };
    (service as any).tickerSubject.next(testTicker);
    service.getTickerUpdates().subscribe(ticker => {
      if (ticker) {
        expect(ticker.s).toBe('BTCUSDT');
        done();
      }
    });
  });
});