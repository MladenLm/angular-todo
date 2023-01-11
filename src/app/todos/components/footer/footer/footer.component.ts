import { Component } from '@angular/core';
import { Observable, observable } from 'rxjs';
import { TodosService } from 'src/app/todos/services/todos.service';
import { map } from 'rxjs/operators'
import { FilterEnum } from 'src/app/todos/types/filter.enum';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  noTodoClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  itemsLeftText$: Observable<string>;
  filterEnum = FilterEnum
  filter$: Observable<FilterEnum>;

  constructor(private todoService: TodosService) {
    this.activeCount$ = this.todoService.todos$.pipe(
      map((todos) => todos.filter((todo) => !todo.isCompleted).length)
    );
    this.itemsLeftText$ = this.activeCount$.pipe(
      map((activeCount) => `item${activeCount !== 1 ? 's': ''} left`)
    )
    this.noTodoClass$ = this.todoService.todos$.pipe(
      map((todos) => todos.length === 0)
    );
    this.filter$ = this.todoService.filter$;
  }

  changeFilter(event: Event, filter: FilterEnum): void {
    event.preventDefault();
    this.todoService.changeFilter(filter);
  }
}
