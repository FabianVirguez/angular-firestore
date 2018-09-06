import { Component, OnInit } from '@angular/core';

import { Task } from '../../models/task';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  tasks: Task[];
  editState: boolean = false;
  taskToEdit: Task;
  constructor(public taskService: TaskService ) { }

  ngOnInit() {
    this.taskService.getTasks().subscribe(tasks => {
      this.tasks = tasks;
    });
  }

  deleteTask(event, task) {
    const response = confirm('Esta seguro de eliminar la tarea?');
    if(response) {
      this.taskService.deleteTask(task);
    }
    return false;
  }

  updateTask(task) {
    this.taskService.updateTask(task);
    this.editState = false;
    this.taskToEdit = null;
    return false;
  }

  editTask(event, task) {
    this.editState = !this.editState;
    this.taskToEdit = task;
    return false;
  }

}
