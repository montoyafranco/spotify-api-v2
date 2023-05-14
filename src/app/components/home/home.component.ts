import { Component } from '@angular/core';
import { finalize, map } from 'rxjs';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private request: RequestService) {}


  private readonly expiresIn = 3600;
  ngOnInit() {
    console.log(
      'este es el token de inicio de sesion de usuario ---------------- \n \n' +
        localStorage.getItem('token')
    );
    this.getToken();
    this.request.getArtist().subscribe((data) => console.log(data));
    this.crearTokenSpotify();

    
  }

  getToken() {
    const cachedToken = localStorage.getItem('spotifyToken');
    console.log(
      ' hola soy token cacheado de spotify ------------ \n\n' + cachedToken
    );

    // this.request.getTokenSpotify().subscribe((data) => {
    //   console.log(data);
    // });
  }
  crearTokenSpotify() {
    if(!localStorage.getItem("spotifyToken")){
      this.request.firstTimeSpotifyToken().subscribe((data) => console.log(data))
    }   
   
 
   
 }

  public isLoading = false;
  public src: string | undefined;
  public data$: any;

  search(value: any): any {
    this.isLoading = true;

    this.data$ = this.request.searchTrack({ q: value }).pipe(
      map(function ({ tracks }) {
        console.log(tracks.items)
        return tracks.items;
      }),
      finalize(() => (this.isLoading = false))
    );
  }
}
 

