import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { catchError, NEVER, switchMap, tap } from 'rxjs';
import { Todo } from './data.model';
import { TodoDataService } from './todo.service';

export interface TodoState {
  todos: Todo[] | undefined;
}

@Injectable()
export class TodoComponentStore extends ComponentStore<TodoState> {
  constructor(private readonly todoDataService: TodoDataService) {
    super({ todos: undefined });
  }

  readonly todos$ = this.select((state) => state.todos);

  readonly updateTodos = this.updater((state, value: Todo[]) => ({
    ...state,
    todos: [...value],
  }));

  readonly updateTodo = this.updater((state, todo: Todo) => {
    const updatedTodos = (state.todos ?? []).map((item) => {
      if (item.id === todo.id) {
        return todo;
      }
      return item;
    });

    return {
      ...state,
      todos: updatedTodos,
    };
  });

  readonly getTodos = this.effect((trigger$) =>
    trigger$.pipe(
      switchMap(() => this.todoDataService.getTodos()),
      tap((response: Todo[]) => {
        this.updateTodos(response);
      }),
      catchError((err: unknown) => {
        return NEVER;
      }),
    ),
  );

  readonly updateSingleTodo = this.effect<Todo>((todo$) =>
    todo$.pipe(
      switchMap((todo) => this.todoDataService.updateTodo(todo)),
      tap((response: Todo) => {
        this.updateTodo(response);
      }),
      catchError((err: unknown) => {
        return NEVER;
      }),
    ),
  );
}
