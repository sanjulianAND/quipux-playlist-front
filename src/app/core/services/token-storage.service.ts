import { Injectable } from '@angular/core';

const KEY = 'access_token';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  getToken(): string | null {
    return localStorage.getItem(KEY);
  }

  setToken(token: string) {
    localStorage.setItem(KEY, token);
  }

  clear() {
    localStorage.removeItem(KEY);
  }
}
