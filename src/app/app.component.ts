import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from './services/authentication/authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Jobby';

  constructor(public translate: TranslateService, public authenticationService: AuthenticationService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('en');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('en');
  }

  ngOnInit(): void {
    if (this.authenticationService.isLoggedIn()) {
      this.authenticationService.user = JSON.parse(localStorage.getItem('currentUser'));
    }
  }

  setLanguage(language: string) {
    console.log(language);
    switch (language) {
      case "nl":
          this.translate.use('nl');
          break;
      case "en":
          this.translate.use('en');
          break;
      default:
          break;
    }
  }
}
