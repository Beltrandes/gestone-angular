import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  const token = authService.getToken();

  const excludedUrls = ['/api/v1/auth/login', '/api/v1/auth/register'];
  const isExcluded = excludedUrls.some((url) => req.url.includes(url));

  if (!isExcluded && token) {
    const clonedReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
    return next(clonedReq).pipe(
      catchError((error) => {
        if (error.status === 401 || error.status === 403) {
          authService.logout();
          router.navigate(['/login'], {
            queryParams: { sessionExpired: true },
          });
        }
        return throwError(() => error);
      })
    );
  }

  return next(req);
};
