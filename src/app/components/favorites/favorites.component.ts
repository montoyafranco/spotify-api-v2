import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';
import jwt_decode from 'jwt-decode';
import { User } from 'src/app/interfaces/Models';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent {

  songIds: string[] = [];
  tracks: any[] = [];
  tokenUser!: string;
  username! : string;
  user!: User;
  constructor(private request: RequestService) { }


  ngOnInit(): void {


    this.tokenUser = localStorage.getItem('token') ?? "" ;
    if (this.tokenUser) {
      const decodedToken: any = jwt_decode(this.tokenUser.split(' ')[1]);
      this.username = decodedToken.sub;
      console.log('Username:', this.username);
    }
    this.request.getUserRequest(this.username).subscribe((data)=>{
      this.user = data;
      console.log(this)
      if (this.user && this.user.id) {
        this.request.getCancionesFavoritas(this.user.id)
        .subscribe(
          (songIds: string[]) => {
            this.songIds = songIds;
            console.log("hola soy songsid en get caniciones " + this.songIds); 
  
            this.request.getTracksByIds(this.songIds)
              .subscribe(
                (response: any) => {
                  this.tracks = response.tracks;
                  console.log(this.tracks); 
                },
                (error: any) => {
                  console.error(error);
                }
              );
          },
          (error: any) => {
            console.error(error);
          }
        );
      }

     

    })
    
    
  
  }

  

}


