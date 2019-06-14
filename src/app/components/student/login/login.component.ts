import {Component, OnInit} from '@angular/core';
import {Student} from '../../../domain/Student';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {Company} from "../../../domain/Company";
import {UserType} from "../../../domain/UserType";
import {environment} from "../../../../environments/environment";
import {TranslateService} from "@ngx-translate/core";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  user: Student = new Student();
  company: Company = new Company();
  isProd = environment.production;

  constructor(private authenticationService: AuthenticationService,
              private snackbar: MatSnackBar,
              private router: Router,
              private translateService: TranslateService) {
    if (authenticationService.isLoggedIn()) {
      this.authenticationService.logout().then(() => {
        window.location.reload()
      });
    }
  }


    ngOnInit() {
  }

  companyLogin() {
    this.authenticationService.loginAsCompany(this.company).subscribe(async (response) => {
      const token: string = response;
      await this.authenticationService.setSession(token, UserType.COMPANY);
      this.translateService.get('LOGIN.SUCCES').subscribe((succesTranslation) => {
        this.snackbar.open(succesTranslation, 'dismiss', {
          duration: 2500
        });
        this.router.navigateByUrl('/');
      });
    }, async (error) => {
      const requestError = error;
      this.translateService.get('LOGIN.ERROR').subscribe((translation) => {
        this.snackbar.open(translation, 'dismiss', {
          duration: 2500,
        });
      });
    });

  }

  studentLogin() {
    this.authenticationService.loginAsStudent(this.user).subscribe(async (response) => {
      const token: string = response;
      await this.authenticationService.setSession(token, UserType.STUDENT);
      const snackbarRef = this.snackbar.open('logged in succesfully', 'dismiss', {
        duration: 2500
      });
      // snackbarRef.afterDismissed().subscribe(() => {
      this.router.navigateByUrl('/');
      //  });
    });
  }
}
