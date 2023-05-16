import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RequestService } from 'src/app/services/request.service';
import jwt_decode from 'jwt-decode';
import { FavoriteDTO, User } from 'src/app/interfaces/Models';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-songinfo',
  templateUrl: './songinfo.component.html',
  styleUrls: ['./songinfo.component.scss'],
})
export class SonginfoComponent {
  songId!: string;
  song: any = {};
  tokenUser!: string;
  username!: string;
  user!: User;

  constructor(private route: ActivatedRoute, private request: RequestService) {}

  ngOnInit() {
    this.songId = this.route.snapshot.paramMap.get('id') || '';
    console.log('Song ID:', this.songId);
    this.request.getSong(this.songId).subscribe((data) => {
      console.log(data);
      this.song = data;
    });

    this.tokenUser = localStorage.getItem('token') ?? '';
    if (this.tokenUser) {
      const decodedToken: any = jwt_decode(this.tokenUser.split(' ')[1]);
      this.username = decodedToken.sub;
      console.log('Username:', this.username);
      
    }

    this.request.getUserRequest(this.username).subscribe((data: User) => {
      console.log(data);
      this.user = data;
    });
  }

  //  }
  onSubmit() {
    const favoriteDTO: FavoriteDTO = {
      user: { id: this.user.id! },
      songId: this.songId,
    };

    this.request.addFavorite(favoriteDTO).subscribe(
      (favorite) => {
        console.log(favorite);

        Swal.fire({
          icon: 'success',
          title: 'Favorito agregado',
          text: 'El favorito se agregó correctamente.',
        });
      },
      (error) => {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudo agregar el favorito.',
        });
      }
    );
  }
  
  
}
