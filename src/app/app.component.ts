import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from './services/authentication/authentication.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Jobby';

  constructor(translate: TranslateService, private authenticationService: AuthenticationService, private route: ActivatedRoute) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');

    this.route.queryParams.subscribe(params => {
      if (params['code'] != null) {
        console.log(params['code']);
      }
    });
  }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.authenticationService.user = JSON.parse(localStorage.getItem('currentUser'));
    }
  }
}
