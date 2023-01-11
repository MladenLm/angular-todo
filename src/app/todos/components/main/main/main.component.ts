import { Component } from '@angular/core';
import { Observable, combineLatest, filter } from 'rxjs';
import { map } from 'rxjs/operators'
import { TodosService } from 'src/app/todos/services/todos.service';
import { FilterEnum } from 'src/app/todos/types/filter.enum';
import { TodoInterface } from 'src/app/todos/types/todo.interface';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
})
export class MainComponent {
  visibleTodos$: Observable<TodoInterface[]>;
  noTodoClass$: Observable<boolean>;
  isAllTodosSelected$: Observable<boolean>
  editingID: string | null = null;

  constructor(private todosService: TodosService) {
    this.isAllTodosSelected$ = this.todosService.todos$.pipe(
      map((todos => todos.every(todo => todo.isCompleted)))
    );
    this.noTodoClass$ = this.todosService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    this.visibleTodos$ = combineLatest(
      this.todosService.todos$,
      this.todosService.filter$
    ).pipe(map(([todos, filter]: [TodoInterface[], FilterEnum]) => {
      if(filter === FilterEnum.active) {
        return todos.filter((todo) => !todo.isCompleted);
      } else if (filter === FilterEnum.completed) {
        return todos.filter((todo) => todo.isCompleted)
      }
      return todos
    })
    );
  }

  toggleAllTodos(event: Event): void {
    const target = event.target as HTMLInputElement
    this.todosService.toggleAll(target.checked)
  }

  setEditingId(editingID: string | null): void {
    this.editingID = editingID;
  }
}
