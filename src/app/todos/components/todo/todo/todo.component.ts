import { Component, ElementRef, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { TodosService } from 'src/app/todos/services/todos.service';
import { TodoInterface } from 'src/app/todos/types/todo.interface';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
})
export class TodoComponent implements OnInit, OnChanges {
  @Input('todo')todoProps!: TodoInterface;
  @Input('isEditing') isEditingProps!: boolean
  @Output('setEditingId') setEditingIdEvent: EventEmitter<string | null> = new EventEmitter();
  editingText: string = '';
  @ViewChild('textInput')textInput!: ElementRef;

  constructor(private todosService: TodosService) {}

  ngOnInit() {
    this.editingText = this.todoProps.text;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['isEditingProps'].currentValue) {
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  setTodoInEditMode() {
    this.setEditingIdEvent.emit(this.todoProps.id);
  }

  removeTodo(): void {
    this.todosService.removeTodo(this.todoProps.id)
  }

  toggleTodo(): void {
    this.todosService.toggleTodo(this.todoProps.id)
  }

  changeText(event: Event): void {
    const value = (event.target as HTMLInputElement).value
    this.editingText = value
  }

  changeTodo(): void {
    this.todosService.changeTodo(this.todoProps.id, this.editingText)
    this.setEditingIdEvent.emit(null)
  }
}
