import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from 'src/app/services/user/user.service';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';
import {MatSnackBar} from "@angular/material";

@Component({
  selector: 'app-usereditprofile',
  templateUrl: './usereditprofile.component.html',
  styleUrls: ['./usereditprofile.component.scss']
})
export class UsereditprofileComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
              public authenticationService: AuthenticationService, private snackbar: MatSnackBar,
              private router: Router) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.updateUser(this.authenticationService.user).subscribe((response) => {
      const snackbarRef = this.snackbar.open('Edit successfully', 'dismiss', {
        duration: 1000});
      snackbarRef.afterDismissed().subscribe(() => {
        this.router.navigateByUrl('/');
      });
    });
  }

}
