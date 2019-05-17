import {Injectable, Injector} from "@angular/core";
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {AuthenticationService} from "../../services/authentication/authentication.service";
import {Observable} from "rxjs";

@Injectable()
export class AuthenticationInterceptor implements HttpInterceptor {

  constructor(public authenticationService: AuthenticationService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationService.hasToken()) {

      console.log('nope...');

      if (this.authenticationService.isExpired()) {
        console.log('expired header...');

        this.authenticationService.refreshToken().then(() => {
           req = req.clone({
             setHeaders: {
               authentication: this.authenticationService.getToken()
             }
           });

           return next.handle(req);
         }).catch(e => console.log(e));
      } else {
        req = req.clone({
          setHeaders: {
            authentication: this.authenticationService.getToken()
          }
        });
        console.log('added header...');
        return next.handle(req);
      }
    } else {
      console.log('skipped header...');

      return next.handle(req);
    }
  }
}
