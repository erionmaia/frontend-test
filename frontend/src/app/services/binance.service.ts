import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Ticker } from '../interfaces/ticker.interface';

@Injectable({
  providedIn: 'root'
})
export class BinanceService {
  private ws: WebSocket | null = null;
  private tickerSubject = new BehaviorSubject<Ticker | null>(null);
  private readonly WS_URL = 'wss://stream.binance.com:9443/ws';
  private subscribedSymbols: Set<string> = new Set();

  constructor() {}

  connect(): void {
    if (this.ws) {
      return;
    }

    this.ws = new WebSocket(this.WS_URL);

    this.ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.e === '24hrTicker') {
        this.tickerSubject.next(data);
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket connection closed');
      this.ws = null;
      // Tentar reconectar após 5 segundos
      setTimeout(() => this.connect(), 5000);
    };
  }

  subscribeToSymbol(symbol: string): void {
    if (!this.subscribedSymbols.has(symbol)) {
      this.subscribedSymbols.add(symbol);
      this.sendSubscriptionMessage(symbol, 'SUBSCRIBE');
    }
  }

  unsubscribeFromSymbol(symbol: string): void {
    if (this.subscribedSymbols.has(symbol)) {
      this.subscribedSymbols.delete(symbol);
      this.sendSubscriptionMessage(symbol, 'UNSUBSCRIBE');
    }
  }

  private sendSubscriptionMessage(symbol: string, action: 'SUBSCRIBE' | 'UNSUBSCRIBE'): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      const message = {
        method: action,
        params: [`${symbol.toLowerCase()}@ticker`],
        id: Date.now()
      };
      this.ws.send(JSON.stringify(message));
    }
  }

  getTickerUpdates(): Observable<Ticker | null> {
    return this.tickerSubject.asObservable();
  }

  getSubscribedSymbols(): string[] {
    return Array.from(this.subscribedSymbols);
  }
} 