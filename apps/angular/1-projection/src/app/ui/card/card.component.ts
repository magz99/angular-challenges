import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CardType } from '../../model/card.model';
import { ListItemComponent } from '../list-item/list-item.component';

@Component({
  selector: 'app-card',
  template: `
    <div
      class="flex w-fit flex-col gap-3 rounded-md border-2 border-black p-4"
      [class]="customClass">
      <ng-content />

      <section>
        <app-list-item
          *ngFor="let item of list"
          [name]="item.firstName ?? item.name"
          [id]="item.id"
          [type]="type"
          (removeItem)="handleRemoveItem($event)"></app-list-item>
      </section>

      <button
        class="rounded-sm border border-blue-500 bg-blue-300 p-2"
        (click)="addNewItem()">
        Add
      </button>
    </div>
  `,
  standalone: true,
  imports: [NgIf, NgFor, ListItemComponent],
})
export class CardComponent {
  @Input() list: any[] | null = null;
  @Input() type!: CardType;
  @Input() customClass = '';
  @Output() addCard: EventEmitter<CardType> = new EventEmitter<CardType>();
  @Output() removeCard: EventEmitter<{ cardType: CardType; id: number }> =
    new EventEmitter<{ cardType: CardType; id: number }>();

  CardType = CardType;

  addNewItem() {
    this.addCard.emit(this.type);
  }

  handleRemoveItem(value: { cardType: CardType; id: number }) {
    this.removeCard.emit(value);
  }
}
