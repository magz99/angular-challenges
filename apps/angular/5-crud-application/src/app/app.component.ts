import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { randText } from '@ngneat/falso';
import { Observable } from 'rxjs';
import { Todo } from './data.model';
import { TodoComponentStore } from './todo.component.store';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-root',
  template: `
    @if (todos$ | async; as todos) {
      <div *ngFor="let todo of todos; trackBy: todoTrackBy">
        {{ todo.title }}
        <button (click)="update(todo)">Update</button>
      </div>
    }
  `,
  styles: [],
  providers: [TodoComponentStore],
})
export class AppComponent {
  todos$: Observable<Todo[] | undefined> = this.store.todos$;

  constructor(private readonly store: TodoComponentStore) {
    this.store.getTodos();
  }

  todoTrackBy(index: number, item: Todo) {
    return item;
  }

  update(todo: Todo) {
    this.store.updateSingleTodo({
      ...todo,
      title: randText(),
    });
  }
}
