import { Component, OnInit } from '@angular/core';
import {Student} from '../../../domain/Student';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication/authentication.service';
import {Company} from "../../../domain/Company";

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
  }

  companyLogin() {
    this.authenticationService.loginAsCompany(this.company).subscribe( (response) => {
      const company: Company = response;
      this.authenticationService.setSession(company);
      const snackbarRef = this.snackbar.open('logged in succesfully', 'dismiss', {
        duration: 1500});
      snackbarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    });

  }

  studentLogin() {
    this.authenticationService.loginAsStudent(this.user).subscribe( (response) => {
      const user: Student = response;
      this.authenticationService.setSession(user);
      const snackbarRef = this.snackbar.open('logged in succesfully', 'dismiss', {
        duration: 1500});
      snackbarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    });
  }
}
