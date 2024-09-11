import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Task } from '../models/tasks.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TasksService {
  private apiUrl = 'https://qvelvlmqlacumhiuywwm.supabase.co';
  apiKey =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2ZWx2bG1xbGFjdW1oaXV5d3dtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjU0NzU2MTAsImV4cCI6MjA0MTA1MTYxMH0.4b1w3C0zmwiyzETNhRFSidL4ao14bM1F-3wtTxACwP0';
  constructor(private http: HttpClient) {}
  getTasks() {
    return this.http.get<Task[]>(`${this.apiUrl}/rest/v1/toDoList`, {
      headers: {
        apikey: this.apiKey,
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }

  addNewTask(task: Task): Observable<Task> {
    return this.http.post<Task>(`${this.apiUrl}/rest/v1/toDoList`, task, {
      headers: {
        apikey: this.apiKey,
        Authorization: `Bearer ${this.apiKey}`,
      },
    });
  }
}
