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
      Authorization: localStorage.getItem('token') ?? '',
    }),
  };

  public getTokenSpotify() {
    const token = localStorage.getItem('spotifyToken');

    if (token) {
      // El token ya está en localStorage, devolverlo como un Observable
      return of(token);
    } else {
      // El token no está en localStorage, enviar una solicitud POST para obtener uno nuevo
      const body = new URLSearchParams();
      body.set('grant_type', 'client_credentials');
      body.set('client_id', '87d9838110b7473d816cd83e0a842bfd');
      body.set('client_secret', '92a8c0f286bc4db4beceb42c036b132a');

      const headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
      };

      return this.http
        .post('https://accounts.spotify.com/api/token', body.toString(), {
          headers,
        })
        .pipe(
          tap((response: any) => {
            // Almacenar el token en localStorage y establecer una hora de expiración de 1 hora
            const expirationTime = Date.now() + response.expires_in * 1000;
            localStorage.setItem('spotifyToken', "Bearer "+ response.access_token);
            localStorage.setItem(
              'spotifyTokenExpiration',
              expirationTime.toString()
            );
          }),
          map((response: any) => {
            // Devolver el token como un Observable
            return response.access_token;
          })
        );
    }
  }

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
    return this.http
      .post<any>(this.BASE_URL, user, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(
        tap((response) => console.log(response)),
        map((response) => response.token),
        catchError(this.handleError<any>('Error '))
      );
  }
}
