import { Component, OnInit, OnDestroy } from '@angular/core';
import { BinanceService } from '../../services/binance.service';
import { Ticker } from '../../interfaces/ticker.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-ticker-display',
  templateUrl: './ticker-display.component.html',
  styleUrls: ['./ticker-display.component.scss']
})
export class TickerDisplayComponent implements OnInit, OnDestroy {
  tickers: Map<string, Ticker> = new Map();
  private subscription: Subscription | null = null;
  displayedColumns: string[] = ['symbol', 'lastPrice', 'bestBid', 'bestAsk', 'priceChange'];

  constructor(private binanceService: BinanceService) {}

  ngOnInit(): void {
    this.binanceService.connect();
    this.subscription = this.binanceService.getTickerUpdates().subscribe(
      (ticker: Ticker | null) => {
        if (ticker) {
          this.tickers.set(ticker.s, ticker);
        }
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  getTickerValues(): Ticker[] {
    return Array.from(this.tickers.values());
  }

  getPriceChangeClass(ticker: Ticker): string {
    const priceChange = parseFloat(ticker.P);
    return priceChange >= 0 ? 'positive' : 'negative';
  }
} 