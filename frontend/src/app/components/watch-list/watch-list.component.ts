import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BinanceService } from '../../services/binance.service';

@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {
  watchListForm: FormGroup;
  availableSymbols: string[] = [
    'BTCUSDT', 'ETHUSDT', 'BNBUSDT', 'ADAUSDT', 'DOGEUSDT',
    'XRPUSDT', 'DOTUSDT', 'UNIUSDT', 'LTCUSDT', 'LINKUSDT'
  ];
  selectedSymbols: string[] = [];

  constructor(
    private fb: FormBuilder,
    private binanceService: BinanceService
  ) {
    this.watchListForm = this.fb.group({
      symbol: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.selectedSymbols = this.binanceService.getSubscribedSymbols();
  }

  addSymbol(): void {
    if (this.watchListForm.valid) {
      const symbol = this.watchListForm.get('symbol')?.value;
      if (!this.selectedSymbols.includes(symbol)) {
        this.selectedSymbols.push(symbol);
        this.binanceService.subscribeToSymbol(symbol);
      }
      this.watchListForm.reset();
    }
  }

  removeSymbol(symbol: string): void {
    this.selectedSymbols = this.selectedSymbols.filter(s => s !== symbol);
    this.binanceService.unsubscribeFromSymbol(symbol);
  }
} 