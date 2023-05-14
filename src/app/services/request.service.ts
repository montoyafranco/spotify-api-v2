import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, map, of, tap } from 'rxjs';
import { AuthResponse, User } from '../interfaces/User';

@Injectable({
  providedIn: 'root',
})

export class RequestService {
  
  createPostUrl: string = 'http://localhost:8080/api/user/register';
  BASE_URL: string = 'http://localhost:8080/api/user/login';

  constructor(private http: HttpClient) {}

  private httpOptionsAuthorization = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': localStorage.getItem('token') ?? ''
    })
  };
  

 

  public createUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.createPostUrl, user, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(catchError(this.handleError<any>('aError')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  public login(user: User): Observable<any> {
    return this.http.post<any>(this.BASE_URL, user, {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    }).pipe(
      tap(response => console.log(response)),
      map(response => response.token),
      catchError(this.handleError<any>('Error '))
    );
  }
  
 
  
  
  
}
