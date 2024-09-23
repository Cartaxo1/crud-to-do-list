import { Component, inject } from '@angular/core';

import { TasksService } from '../../services/tasks.service';
import { Task } from '../../models/tasks.model';
import { DragDropModule } from 'primeng/dragdrop';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { FormBuilder, FormControl, ReactiveFormsModule } from '@angular/forms';

export interface iUpdateFormTask {
  title?: FormControl<string | null>;
  description?: FormControl<string | null>;
  status?: FormControl<boolean | null>;
}
@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    DragDropModule,
    DialogModule,
    ButtonModule,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss',
})
export class TasksComponent {
  private _formBuilder = inject(FormBuilder);
  tasks: Task[] = [];
  selectedTasks: Task[] = [];
  draggedTask: Task | undefined | null;
  visible: boolean = false;
  editTask: boolean = false;
  title = '';
  description = '';
  status = false;

  constructor(private tasksService: TasksService) {}

  form = this._formBuilder.group<iUpdateFormTask>({
    title: this._formBuilder.control(''),
    description: this._formBuilder.control(''),
    status: this._formBuilder.control(false),
  });
  ngOnInit() {
    this.selectedTasks = [];
    this.getTasks();
    this.tasks;
  }

  getTasks() {
    this.tasksService.getTasks().subscribe((tasks: any) => {
      this.tasks = tasks;
    });
  }

  showDialog() {
    this.visible = true;
  }

  showEditTask() {
    this.editTask = true;
  }

  deleteTask(id: number) {
    this.tasksService.deleteTask(id).subscribe((_) => {
      this.getTasks();
    });
  }

  updateTask(id: number, task: any) {
    this.tasksService.updateTask(id, this.form.value).subscribe((_) => {
      this.getTasks();
    });
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
