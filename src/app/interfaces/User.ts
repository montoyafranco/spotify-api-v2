import { HttpHeaders } from "@angular/common/http";

export interface User {
    id?: number;
    username: string;
    password: string;
  }
  
export interface AuthResponse {
    headers: HttpHeaders;
    // Aquí podrías agregar más propiedades si lo necesitas
  }
    