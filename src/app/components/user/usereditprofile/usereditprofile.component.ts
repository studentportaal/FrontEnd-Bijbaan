import {Component, OnInit} from '@angular/core';
import {User} from 'src/app/domain/User';
import {ActivatedRoute} from '@angular/router';
import {UserService} from 'src/app/services/user/user.service';
import {AuthenticationService} from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-usereditprofile',
  templateUrl: './usereditprofile.component.html',
  styleUrls: ['./usereditprofile.component.scss']
})
export class UsereditprofileComponent implements OnInit {

  user: User = new User();

  constructor(private activatedRoute: ActivatedRoute, private userService: UserService,
              private authenticationService: AuthenticationService) {
  }

  ngOnInit() {
  }

  onSubmit() {
    this.userService.updateUser(this.authenticationService.user).subscribe((response) => console.log('done'));
  }

}
