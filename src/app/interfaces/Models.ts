import { HttpHeaders } from '@angular/common/http';

export interface User {
  id?: number;
  username: string;
  password: string;
}

export interface AuthResponse {
  headers: HttpHeaders;
}

export interface FavoriteDTO {
  user: UserDTOFavorite;
  songId: string;
}

export interface UserDTOFavorite {
  id: number;
}
