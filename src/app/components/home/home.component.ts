import { Component } from '@angular/core';
import { finalize, map } from 'rxjs/operators';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private request: RequestService) {}

  tokenUser: string | null = null;
  private readonly expiresIn = 3600;

  ngOnInit() {
    this.tokenUser = localStorage.getItem('token');
    console.log('Este es el token de inicio de sesión de usuario:', this.tokenUser);
    this.getTokenSpotifyCacheado();
    this.request.getArtist().subscribe((data) => console.log(data));
    this.crearTokenSpotify();
    this.showAlert();
  }

  getTokenSpotifyCacheado() {
    const cachedToken = localStorage.getItem('spotifyToken');
    console.log('Hola, soy el token cacheado de Spotify:', cachedToken);
  
  }

  crearTokenSpotify() {
    if (!localStorage.getItem('spotifyToken')) {
      this.request.firstTimeSpotifyToken().subscribe((data) => console.log(data));
    } else {
      console.log('Usuario con sesión para Spotify válida');
    }
  }

  public isLoading = false;
  public src: string | undefined;
  public data$: any;

  search(value: any): any {
    this.isLoading = true;

    this.data$ = this.request.searchTrack({ q: value }).pipe(
      map(function ({ tracks }) {
        console.log(tracks.items);
        return tracks.items;
      }),
      finalize(() => (this.isLoading = false))
    );
  }

  showAlert(): void {
    if (!this.tokenUser) {
      Swal.fire({
        title: 'Para disfrutar de todas las funcionalidades, debes iniciar sesión.',
        position: 'top-end',
        showClass: {
          popup: 'animate__animated animate__fadeInDown'
        },
        hideClass: {
          popup: 'animate__animated animate__fadeOutUp'
        }
      });
    }
  }
}
