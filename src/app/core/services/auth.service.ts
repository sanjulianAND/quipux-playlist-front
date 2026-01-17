import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { LoginRequest, LoginResponse } from '../models/auth.models';
import { TokenStorageService } from './token-storage.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  private readonly tokenStorage = inject(TokenStorageService);

  login(req: LoginRequest) {
    return this.http
      .post<LoginResponse>('/auth/login', req)
      .pipe(tap((resp) => this.tokenStorage.setToken(resp.accessToken)));
  }

  logout(): void {
    this.tokenStorage.clear();
  }
}
