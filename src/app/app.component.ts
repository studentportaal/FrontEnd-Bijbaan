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

  constructor(translate: TranslateService, private authenticationService: AuthenticationService, private route: ActivatedRoute, private snackbar: MatSnackBar, private router: Router) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    this.route.queryParams.subscribe(params => {
      if (params['code'] != null) {
        console.log(params['code']);
        this.authenticationService.fontysLogin(params['code']).subscribe( (response) => {
          const student: Student = response;
          this.authenticationService.setSession(student, UserType.STUDENT);
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
}
