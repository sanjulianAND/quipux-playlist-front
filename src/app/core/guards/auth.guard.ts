import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { TokenStorageService } from '../services/token-storage.service';

export const authGuard: CanActivateFn = () => {
  const token = inject(TokenStorageService).getToken();
  if (token) return true;
  inject(Router).navigateByUrl('/login');
  return false;
};
