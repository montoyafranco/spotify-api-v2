import { Component, Input } from '@angular/core';
import { User } from 'src/app/interfaces/User';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  @Input() username: string = "";
  @Input() password: string = "";

  constructor(private request : RequestService) {}

  onSubmit(): void {
    const user: User  = { username: this.username, password: this.password };
   

    this.request.createUser(user).subscribe({
      next: user => console.log(user),
      error: err => console.error(err),
      complete: () => console.log('Request complete')
  });
  
  }
}


