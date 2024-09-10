import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { NavComponent } from '../nav/nav.component';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/tasks.model';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterModule,
    NavComponent,
    ButtonModule,
    DialogModule,
    InputTextModule,
    CardModule,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  visible: boolean = false;

  tasks: Task[] = [];

  constructor(private tasksService: TasksService) {}

  showDialog() {
    this.visible = true;
  }

  getTasks() {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      console.log(this.tasks);
    });
  }

  ngOnInit() {
    this.getTasks();
  }
}
