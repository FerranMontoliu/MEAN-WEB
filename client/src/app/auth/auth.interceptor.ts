import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";

import { UserService } from "../shared/user/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService: UserService, private router: Router) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {
        if(request.headers.get('noauth'))
            return next.handle(request.clone());

        // Inject JWT token if needed
        return next.handle(
            request.clone({headers: request.headers.set(
                "Authorization", 
                `Bearer ${this.userService.getToken()}`)}
            )
        ).pipe(
            tap(
                event => {},
                err => {
                    if(err.erro.auth == false)
                        this.router.navigateByUrl('/signin');
                }
            )
        );
    }
}