import { Injectable } from '@angular/core';

import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from '@angular/common/http';
import { Observable, catchError, map, of, tap, throwError } from 'rxjs';
import { AuthResponse, FavoriteDTO, User } from '../interfaces/Models';

@Injectable({
  providedIn: 'root',
})
export class RequestService {
  createPostUrl: string = 'http://localhost:8080/api/user/register';
  BASE_URL: string = 'http://localhost:8080/api/user/login';
  Buscar: string = 'https://api.spotify.com/v1/search';
  GET_SONG_URL_SPOTIFY: string = 'https://api.spotify.com/v1/tracks/';
  GET_SONGS: string = 'http://localhost:8080/api/favorites/canciones/';

  POST_FAVORITE: string = 'http://localhost:8080/api/favorites/guardar';

  GET_Spotify_All_Songs = 'https://api.spotify.com/v1';

  private headerCustom!: HttpHeaders;

  constructor(private http: HttpClient) {}

  public searchTrack({ q }: TrackModel): Observable<any> {
    this.headerCustom = new HttpHeaders({
      Authorization: `${localStorage.getItem('spotifyToken')}`,
    });
    return this.http
      .get(`${this.Buscar}?q=${q}&type=track&limit=10`, {
        headers: this.headerCustom,
      })
      .pipe(
        catchError((error: HttpErrorResponse) => {
          if (error.status === 401) {
            this.handleUnauthorizedError();
          }
          return throwError(error);
        })
      );
  }

  public handleUnauthorizedError() {
    localStorage.removeItem('spotifyToken');
    this.firstTimeSpotifyToken();
  }

  public getArtist() {
    let token = localStorage.getItem('spotifyToken');
    console.log('Soy el log de GetArtis en service \n\n' + token);

    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `${token}`,
    };

    return this.http.get(
      'https://api.spotify.com/v1/search?q=remaster%2520track%3ADoxy%2520artist%3AMiles%2520Davis&type=album',
      { headers }
    );
  }
  public getSong(id: string) {
    let token = localStorage.getItem('spotifyToken');
    console.log('Soy el log de getSONG \n\n' + token);

    let headers = {
      Authorization: `${token}`,
    };

    return this.http
      .get(`${this.GET_SONG_URL_SPOTIFY}${id}`, { headers })
      .pipe(catchError(this.handleError<any>('aError')));
  }

  public firstTimeSpotifyToken() {
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
          localStorage.setItem(
            'spotifyToken',
            'Bearer ' + response.access_token
          );
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

  public createUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.createPostUrl, user, {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      })
      .pipe(catchError(this.handleError<any>('aError')));
  }

  public getUserRequest(username: string): Observable<User> {
    return this.http
      .get<User>(`http://localhost:8080/api/user/get/${username}`)
      .pipe(catchError(this.handleError<any>('aError')));
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return throwError(error);
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

  addFavorite(favoriteDTO: FavoriteDTO): Observable<FavoriteDTO> {

    
    const url = `${this.POST_FAVORITE}`;
  const token = localStorage.getItem('token') || '';
  const headers = new HttpHeaders().set('Authorization', token);

  return this.http.post<FavoriteDTO>(url, favoriteDTO, { headers });
  }

  getCancionesFavoritas(userId: number): Observable<string[]> {
    const url = `${this.GET_SONGS}${userId}`;
    const token = localStorage.getItem('token') || '';
    const headers = new HttpHeaders().set('Authorization', token);
    return this.http.get<string[]>(url, { headers });
  }

  getTracksByIds(ids: string[]): Observable<any> {
    const url = `${this.GET_Spotify_All_Songs}/tracks?ids=${ids.join(',')}`;
    console.log(ids);
    const headers = new HttpHeaders().set(
      'Authorization',
      ` ${localStorage.getItem('spotifyToken')}`
    );
    return this.http.get<any>(url, { headers });
  }
}

export class TrackModel {
  q: string | undefined;
}
