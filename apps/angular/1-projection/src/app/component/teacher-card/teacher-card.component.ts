import { Component, OnInit } from '@angular/core';
import {
  FakeHttpService,
  randTeacher,
} from '../../data-access/fake-http.service';
import { TeacherStore } from '../../data-access/teacher.store';
import { CardType } from '../../model/card.model';
import { Teacher } from '../../model/teacher.model';
import { CardComponent } from '../../ui/card/card.component';

@Component({
  selector: 'app-teacher-card',
  template: `
    <app-card
      [list]="teachers"
      [type]="cardType"
      (addCard)="handleAddCard($event)"
      (removeCard)="handleRemoveCard($event)"
      customClass="bg-light-red">
      <img src="assets/img/teacher.png" width="200px" />
    </app-card>
  `,
  standalone: true,
  imports: [CardComponent],
})
export class TeacherCardComponent implements OnInit {
  teachers: Teacher[] = [];
  cardType = CardType.TEACHER;

  constructor(
    private http: FakeHttpService,
    private store: TeacherStore,
  ) {}

  ngOnInit(): void {
    this.http.fetchTeachers$.subscribe((t) => this.store.addAll(t));

    this.store.teachers$.subscribe((t) => (this.teachers = t));
  }

  handleAddCard(cardType: CardType) {
    if (cardType === CardType.TEACHER) {
      this.store.addOne(randTeacher());
    }
  }

  handleRemoveCard(value: { cardType: CardType; id: number }) {
    if (value.cardType === CardType.TEACHER) {
      this.store.deleteOne(value.id);
    }
  }
}
