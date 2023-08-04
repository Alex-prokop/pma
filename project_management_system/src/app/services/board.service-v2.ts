import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Board } from '../models/Board';
import { Column, Task } from '../models/Board';

import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BoardServiceV2 {
  constructor(private http: HttpClient) {}

  create(title: string, userId: string) {
    return this.http.post(`${environment.apiUrl}/boards`, {
      title: title,
      owner: userId,
      users: [],
    });
  }

  getAll() {
    return this.http.get<Board[]>(`${environment.apiUrl}/boards`);
  }
  getBoardById(boardId: string) {
    return this.http.get<Board>(`${environment.apiUrl}/boards/${boardId}`);
  }
  getById(userId: string) {
    return this.http.get<Board[]>(`${environment.apiUrl}/boardsSet/${userId}`);
  }

  delete(id: string) {
    return this.http.delete(`${environment.apiUrl}/boards/${id}`);
  }

  getColumns(boardId: string) {
    return this.http.get<Column[]>(
      `${environment.apiUrl}/boards/${boardId}/columns`
    );
  }

  getColumnById(boardId: string, columnId: string) {
    return this.http.get<Column>(
      `${environment.apiUrl}/boards/${boardId}/columns/${columnId}`
    );
  }

  createColumn(boardId: string, title: string, order: number) {
    return this.http.post<Column>(
      `${environment.apiUrl}/boards/${boardId}/columns`,
      { title: title, order: order }
    );
  }

  deleteColumn(boardId: string | undefined, columnId: string) {
    return this.http.delete(
      `${environment.apiUrl}/boards/${boardId}/columns/${columnId}`
    );
  }

  getTasks(boardId: string, columnId: string) {
    return this.http.get<Task[]>(
      `${environment.apiUrl}/boards/${boardId}/columns/${columnId}/tasks`
    );
  }

  getBoardTasks(boardId: string) {
    return this.http.get<Task[]>(`${environment.apiUrl}/tasksSet/${boardId}`);
  }

  createTask(
    boardId: string,
    columnId: string,
    userId: string,
    title: string,
    description: string,
    order: number
  ) {
    return this.http.post<Task>(
      `${environment.apiUrl}/boards/${boardId}/columns/${columnId}/tasks`,
      {
        userId: userId,
        title: title,
        description: description,
        order: order,
        users: [],
      }
    );
  }

  deleteTask(boardId: string | undefined, columnId: string, taskId: string) {
    return this.http.delete(
      `${environment.apiUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`
    );
  }
  ///boards/{boardId}/columns/{columnId}/tasks/{taskId}
  editTask(
    boardId: string | undefined,
    columnId: string,
    taskId: string,
    userId: string,
    title: string,
    description: string,
    order: number
  ) {
    return this.http.put(
      `${environment.apiUrl}/boards/${boardId}/columns/${columnId}/tasks/${taskId}`,
      {
        userId: userId,
        columnId: columnId,
        title: title,
        description: description,
        order: order,
        users: [],
      }
    );
  }

  editColumn(
    boardId: string | undefined,
    columnId: string,
    title: string,
    order: number
  ) {
    return this.http.put(
      `${environment.apiUrl}/boards/${boardId}/columns/${columnId}`,
      { title: title, order: order }
    );
  }
}
