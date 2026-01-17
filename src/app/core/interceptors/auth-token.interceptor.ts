import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { TokenStorageService } from '../services/token-storage.service';

export const authTokenInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.startsWith('/auth/login')) return next(req);

  const token = inject(TokenStorageService).getToken();
  if (!token) return next(req);

  return next(
    req.clone({
      setHeaders: { Authorization: `Bearer ${token}` },
    }),
  );
};
