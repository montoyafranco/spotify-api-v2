import { Component } from '@angular/core';
import { RequestService } from 'src/app/services/request.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor(private request: RequestService) {}

  private readonly accessTokenKey = 'spotifyToken';
  private readonly expiresIn = 3600;
  ngOnInit() {
    console.log(localStorage.getItem('token'));
    this.getToken();
  }

  getToken() {
    const cachedToken = localStorage.getItem(this.accessTokenKey);
    console.log(cachedToken);
    if (cachedToken) {
      const { token, expiration } = JSON.parse(cachedToken);
      if (expiration > Date.now()) {
        // Token is still valid, return it
        console.log(token);
        return token;
      }
      // Token has expired, remove it from cache
      localStorage.removeItem(this.accessTokenKey);
    }
    this.request.getTokenSpotify().subscribe((data) => {
      console.log(data);
    });
  }
}
