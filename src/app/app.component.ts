import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from './services/authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Student} from "./domain/Student";
import {UserType} from "./domain/UserType";
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Jobby';
  languageicon = 'gb';

  constructor(public translate: TranslateService, private authenticationService: AuthenticationService, private route: ActivatedRoute, private snackbar: MatSnackBar, private router: Router) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    this.route.queryParams.subscribe(params => {
      if (params['code'] != null) {
        this.authenticationService.fontysLogin(params['code']).subscribe( (response) => {
          const token: string = response;
          this.authenticationService.setSession(token, UserType.STUDENT);
          const snackbarRef = this.snackbar.open('logged in succesfully', 'dismiss', {
            duration: 1500});
          snackbarRef.afterDismissed().subscribe(() => {
            this.router.navigateByUrl('/');
          });
        });
      }
    });
  }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.authenticationService.user = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  setLanguage(language: string) {
    switch (language) {
      case "nl":
          this.languageicon = 'nl';
          this.translate.use('nl');
          break;
      case "en":
          this.languageicon = 'gb';
          this.translate.use('en');
          break;
      default:
          break;
    }
  }
}
