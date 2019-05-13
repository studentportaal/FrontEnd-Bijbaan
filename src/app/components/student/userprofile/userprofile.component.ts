import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { ActivatedRoute } from '@angular/router';
import {AuthenticationService} from '../../../services/authentication/authentication.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  user: any;

  constructor(private activatedRoute: ActivatedRoute,
              private userService: UserService,
              private authenticationService: AuthenticationService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      const id = params.uuid;
      this.getUserById(id);
    });
  }

  getUserById(id: string) {
    this.userService.getUserById(id).subscribe((response: any) => {
      this.user = response;
    });
  }
}
