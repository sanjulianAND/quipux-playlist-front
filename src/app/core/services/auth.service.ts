import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { APP_CONFIG } from '../config/app-config';
import { LoginRequest, LoginResponse } from '../models/auth.models';
import { TokenStorageService } from './token-storage.service';
import { Observable, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  constructor(
    private http: HttpClient,
    private tokenStorage: TokenStorageService,
    private router: Router,
  ) {}

  login(payload: LoginRequest): Observable<LoginResponse> {
    const url = `${APP_CONFIG.apiBaseUrl}/auth/login`;
    return this.http.post<LoginResponse>(url, payload).pipe(
      tap((resp) => {
        this.tokenStorage.setAccessToken(resp.accessToken);
      }),
    );
  }

  logout(): void {
    this.tokenStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
