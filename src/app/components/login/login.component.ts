import { Component, Input } from '@angular/core';

import { User } from 'src/app/interfaces/User';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() username: string = "";
  @Input() password: string = "";

  constructor(private request : RequestService) {}

  onSubmit(): void {
    const user: User  = { username: this.username, password: this.password };
   
    this.request.login(user).subscribe({
      next: response => {
        const token = response;
        console.log('response:', response);
        console.log(token)
        if (token) {
          localStorage.setItem('token', token);
          console.log('Login exitoso');
          console.log(localStorage.getItem('token'))
        } else {
          console.log('No se pudo obtener el token de autorización');
        }
      },
      error: error => {
        console.log(error);
      }
    });
  }
  
}
