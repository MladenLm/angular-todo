import { Component } from '@angular/core';
import { TodosService } from '../../services/todos.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent {

  constructor(private todoService: TodosService) {
  }

  text: string = ''

  changeText(event: Event): void {
    const target = event.target as HTMLInputElement
    this.text = target.value;
    console.log(target.value)
  }

  addTodo(): void {
    this.todoService.addTodo(this.text)
    this.text = ''
  }
}
