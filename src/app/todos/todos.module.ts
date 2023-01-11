import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodosComponent } from './components/todos/todos/todos.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { MainComponent } from './components/main/main/main.component';
import { TodoComponent } from './components/todo/todo/todo.component';
import { FooterComponent } from './components/footer/footer/footer.component';

const routes: Routes = [
  {
    path: '',
    component: TodosComponent,
  }
]

@NgModule({
  declarations: [
    TodosComponent,
    HeaderComponent,
    MainComponent,
    TodoComponent,
    FooterComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class TodosModule { }
