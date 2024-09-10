import { Component } from '@angular/core';

import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/tasks.model';
import { DragDropModule } from 'primeng/dragdrop';
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [DragDropModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  tasks: Task[] = [];
  selectedTasks: Task[] = [];
  draggedTask: Task | undefined | null;

  constructor(private tasksService: TasksService) {}

  getTasks() {
    this.tasksService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      console.log(this.tasks);
    });
  }
  ngOnInit() {
    this.selectedTasks = [];
    this.tasks;
    this.getTasks()
  }

  dragStart(task: Task) {
    this.draggedTask = task;
  }

  drop() {
    if (this.draggedTask) {
      let draggedProductIndex = this.findIndex(this.draggedTask);
      this.selectedTasks = [
        ...(this.selectedTasks as Task[]),
        this.draggedTask,
      ];
      this.tasks = this.tasks?.filter((val, i) => i != draggedProductIndex);
      this.draggedTask = null;
    }
  }

  dragEnd() {
    this.draggedTask = null;
  }

  findIndex(task: Task) {
    let index = -1;
    for (let i = 0; i < (this.tasks as Task[]).length; i++) {
      if (task.id === (this.tasks as Task[])[i].id) {
        index = i;
        break;
      }
    }
    return index;
  }
}
