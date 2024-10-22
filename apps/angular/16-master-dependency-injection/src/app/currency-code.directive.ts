import { Directive, Injector, Input, OnInit } from '@angular/core';
import { CurrencyService } from './currency.service';

@Directive({
  selector: '[appCurrencyCode]',
  standalone: true,
  providers: [CurrencyService],
})
export class CurrencyCodeDirective implements OnInit {
  @Input({ required: true }) appCurrencyCode!: string;

  constructor(private readonly injector: Injector) {}

  ngOnInit() {
    const currencyService = this.injector.get(CurrencyService);
    currencyService.patchState({ code: this.appCurrencyCode });
  }
}
