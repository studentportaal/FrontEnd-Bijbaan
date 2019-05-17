import {Injectable} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(public authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationService.hasToken()) {
      if (this.authenticationService.isExpired()) {

        this.authenticationService.refreshToken().then(() => {
           req = req.clone({
             setHeaders: {
               authentication: this.authenticationService.getToken()
             }
           });

           return next.handle(req);
         });
      } else {
        req = req.clone({
          setHeaders: {
            authentication: this.authenticationService.getToken()
          }
        });
        return next.handle(req);
      }
    } else {
      return next.handle(req);
    }
  }
}
