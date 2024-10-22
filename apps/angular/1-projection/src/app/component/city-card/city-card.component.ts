import { Component, OnInit } from '@angular/core';
import { CityStore } from '../../data-access/city.store';
import {
  FakeHttpService,
  randomCity,
} from '../../data-access/fake-http.service';
import { CardType } from '../../model/card.model';
import { City } from '../../model/city.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-city-card',
  template: `
    <app-card
      [list]="cities"
      [type]="cardType"
      (addCard)="handleAddCard($event)"
      (removeCard)="handleRemoveCard($event)"
      customClass="bg-light-blue">
      <img src="assets/img/city.png" width="200px" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class CityCardComponent implements OnInit {
  cities: City[] = [];
  cardType = CardType.CITY;

  constructor(
    private http: FakeHttpService,
    private store: CityStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchCities$.subscribe((c) => this.store.addAll(c));

    this.store.cities$.subscribe((c) => (this.cities = c));
  }

  handleAddCard(cardType: CardType) {
    if (cardType === CardType.CITY) {
      this.store.addOne(randomCity());
    }
  }

  handleRemoveCard(value: { cardType: CardType; id: number }) {
    if (value.cardType === CardType.CITY) {
      this.store.deleteOne(value.id);
    }
  }
}
