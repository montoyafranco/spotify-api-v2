import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {



  logout(): void {
    
    localStorage.removeItem('spotifyToken');
    localStorage.removeItem('spotifyTokenExpiration');
    localStorage.removeItem('token');
  
    
    Swal.fire({
      icon: 'success',
      title: '¡Cierre de sesión exitoso!',
      text: 'Has cerrado sesión correctamente.',
      showConfirmButton: false,
      timer: 2000
    });
  }
  

}
