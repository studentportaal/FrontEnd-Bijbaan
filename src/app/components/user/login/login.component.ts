import { Component, OnInit } from '@angular/core';
import {User} from '../../../domain/User';
import {MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {AuthenticationService} from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  user: User = new User();

  constructor(private authenticationService: AuthenticationService,
              private snackbar: MatSnackBar,
              private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.authenticationService.login(this.user).subscribe( (response) => {
      const user: User = response;
      this.authenticationService.setSession(user);
      const snackbarRef = this.snackbar.open('logged in succesfully', 'dismiss', {
        duration: 3000});
      snackbarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    });
  }
}
