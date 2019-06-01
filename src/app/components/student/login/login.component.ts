import { Component, OnInit } from '@angular/core';
import {Student} from '../../../domain/Student';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {Company} from "../../../domain/Company";
import {UserType} from "../../../domain/UserType";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  user: Student = new Student();
  company: Company = new Company();

  constructor(private authenticationService: AuthenticationService,
              private snackbar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
    this.authenticationService.logout();
  }

  companyLogin() {
    this.authenticationService.loginAsCompany(this.company).subscribe( async (response) => {
      const token: string = response;
      await this.authenticationService.setSession(token, UserType.COMPANY);
      const snackbarRef = this.snackbar.open('logged in succesfully', 'dismiss', {
        duration: 2500
      });
      snackbarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    });

  }

  studentLogin() {
    this.authenticationService.loginAsStudent(this.user).subscribe( async (response) => {
      const token: string = response;
      await this.authenticationService.setSession(token, UserType.STUDENT);
      const snackbarRef = this.snackbar.open('logged in succesfully', 'dismiss', {
        duration: 2500
      });
      snackbarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    });
  }
}
