import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const http = inject(HttpClient);
  const token = localStorage.getItem('token');

  // ⛔ Ne pas intercepter la route de rafraîchissement
  if (req.url.includes('/api/token/refresh')) {
    return next(req);
  }

  const authReq = token
    ? req.clone({
      headers: req.headers.set('Authorization', `Bearer ${token}`)
    })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      // Si le token est expiré ou manquant
      if (error.status === 401 && token) {
        return http.post<{ token: string }>('/api/token/refresh', {}).pipe(
          switchMap(res => {
            localStorage.setItem('token', res.token);
            // Rejoue la requête d’origine avec le nouveau token
            const retried = authReq.clone({
              headers: authReq.headers.set('Authorization', `Bearer ${res.token}`)
            });
            return next(retried);
          }),
          catchError(err => {
            // Si le refresh échoue, nettoie le token et propage l’erreur
            localStorage.removeItem('token');
            return throwError(() => err);
          })
        );
      }

      return throwError(() => error);
    })
  );
};
