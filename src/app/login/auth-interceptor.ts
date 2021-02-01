import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    constructor(private authService : AuthService){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        let authReq = req;
        //const token = this.token.getToken();
        //if (token != null) {
          authReq = req.clone({ headers: req.headers.set('Authorization','Basic UkVTVDokMmIkMTAkWnBHMzdSQjh0VHZ6RW9iWldYV3BrLmhHMFlET3FDaVJma2pCT01GNE9IVVFOSENFR3pZNHk=') });
        //}
        return next.handle(authReq);
      }
}