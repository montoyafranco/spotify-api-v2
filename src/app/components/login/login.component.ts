import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { RequestService } from 'src/app/services/request.service';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  @Input() username: string = '';
  @Input() password: string = '';

  constructor(private request: RequestService, private router: Router) {}

  onSubmit(): void {
    const user: User = { username: this.username, password: this.password };

    this.request.login(user)
      .pipe(
        catchError((error) => {
          console.error(error);
          this.showErrorAlert('Error en el inicio de sesión', 'Hubo un problema al intentar iniciar sesión.');
          return throwError(error);
        })
      )
      .subscribe(response => {
        const token = response;
        console.log('response:', response);
        console.log(token);
        if (token) {
          localStorage.setItem('token', token);
          console.log('Login exitoso');
          console.log(localStorage.getItem('token'));
          this.showSuccessAlert('Inicio de sesión exitoso');
          this.router.navigate(['']); // Redireccionar a la página de inicio
        } else {
          console.log('No se pudo obtener el token de autorización');
        }
      });
  }

  private showSuccessAlert(title: string): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500
    });
  }

  private showErrorAlert(title: string, text: string): void {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    });
  }
}
