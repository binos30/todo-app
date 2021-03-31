import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Todo } from '../models/Todo';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private TODOS_URL = 'https://jsonplaceholder.typicode.com/todos';
  private TODOS_LIMIT = '?_limit=10';

  constructor(private http: HttpClient) { }

  getTodos(): Observable<Todo[]> {
    return this.http.get<Todo[]>(`${this.TODOS_URL}${this.TODOS_LIMIT}`).pipe(
      catchError(this.handleError)
    );
  }

  addTodo(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(this.TODOS_URL, todo, HTTP_OPTIONS).pipe(
      catchError(this.handleError)
    );
  }

  toggleCompleted(todo: Todo): Observable<Todo> {
    const URL = `${this.TODOS_URL}/${todo.id}`;
    return this.http.put<Todo>(URL, todo, HTTP_OPTIONS).pipe(
      catchError(this.handleError)
    );
  }

  deleteTodo(todo: Todo): Observable<Todo> {
    const URL = `${this.TODOS_URL}/${todo.id}`;
    return this.http.delete<Todo>(URL, HTTP_OPTIONS).pipe(
      catchError(this.handleError)
    );
  }

  private handleError(err: HttpErrorResponse) {
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
