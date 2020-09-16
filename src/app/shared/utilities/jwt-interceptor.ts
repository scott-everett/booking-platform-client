import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AccountService } from '../services/account.service';

@Injectable({
  providedIn: 'root',
})
export class JwtInterceptor implements HttpInterceptor {
  constructor(private accountService: AccountService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Get the access token (this should have already been read from local storage)
    const accessToken =
      this.accountService.currentAccount &&
      this.accountService.currentAccount.accessToken
        ? this.accountService.currentAccount.accessToken
        : null;

    if (accessToken) {
      // We have an access token - clone the request and add it to the header
      const cloned = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + accessToken),
      });

      return next.handle(cloned);
    } else {
      // No token found - make the request without one in the header
      return next.handle(req);
    }
  }
}
