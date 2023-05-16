import { Component, Input } from '@angular/core';
import { NgForm } from '@angular/forms';
import { catchError, throwError } from 'rxjs';
import { User } from 'src/app/interfaces/User';
import { RequestService } from 'src/app/services/request.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  @Input() username: string = '';
  @Input() password: string = '';

  isFormSubmitted: boolean = false;
  isFormValid: boolean = false;

  constructor(private request: RequestService, private router: Router) {}

  onSubmit(form: NgForm): void {
    this.isFormSubmitted = true;
    this.isFormValid = form.valid ?? false;

    if (this.isFormValid) {
      const user: User = { username: this.username, password: this.password };

      this.request
        .createUser(user)
        .pipe(
          catchError((error) => {
            console.error(error);
            this.showErrorAlert('Oops...', 'Prueba con otro usuario !');
            return throwError(error);
          })
        )
        .subscribe({
          next: (user) => {
            console.log(user);
            this.showSuccessAlert('Your work has been saved');
            setTimeout(() => {
              this.router.navigateByUrl('/login');
            }, 1500);
          },
          complete: () => console.log('Request complete'),
        });
    } else {
      this.showErrorAlert('Oops...', 'Asegúrate de que tu username y contraseña tengan una longitud superior a 4!');
    }
  }

  showSuccessAlert(title: string): void {
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: title,
      showConfirmButton: false,
      timer: 1500
    });
  }

  showErrorAlert(title: string, text: string): void {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
    });
  }
}
