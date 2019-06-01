import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {AuthenticationService} from './services/authentication/authentication.service';
import {ActivatedRoute, Router} from '@angular/router';
import {UserType} from "./domain/UserType";
import {MatSnackBar} from "@angular/material";
import {NotificationService} from "./services/notification/notification.service";
import {Notification} from "./domain/Notification";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'Jobby';
  languageicon = 'nl';
  notifications: Notification[];
  unread;

  constructor(public translate: TranslateService,
              public authenticationService: AuthenticationService,
              private route: ActivatedRoute,
              private snackbar: MatSnackBar,
              private router: Router,
              private notificationService: NotificationService) {
    // this language will be used as a fallback when a translation isn't found in the current language
    translate.setDefaultLang('nl');

    // the lang to use, if the lang isn't available, it will use the current loader to get them
    translate.use('nl');

    this.route.queryParams.subscribe(params => {
      if (params['code'] != null) {
        this.authenticationService.fontysLogin(params['code']).subscribe((response) => {
          const token: string = response;
          this.authenticationService.setSession(token, UserType.STUDENT);
          const snackbarRef = this.snackbar.open('logged in succesfully', 'dismiss', {
            duration: 1500
          });
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
      this.notificationService.getNotifications(this.authenticationService.user).subscribe((res) => {
        this.notifications = res;

        if (this.notifications) {
          this.calculateUnread(this.notifications);
        }
      });


    }
  }


  editNotification() {
    this.notificationService.editNotification(this.notifications).subscribe(res => {
        this.notificationService.getNotifications(this.authenticationService.user).subscribe(newNotifications => {
          this.notifications = newNotifications;

          this.calculateUnread(this.notifications);
          this.router.navigateByUrl('/');
        });
      }
    );
  }

  calculateUnread(notifications: Notification[]) {

    this.unread = 0;
    notifications.forEach(x => {
      if (x.read === false) {
        this.unread++;
      }
    });
  }

  setLanguage(language: string) {
    switch (language) {
      case "nl":
        this.languageicon = 'nl';
        this.translate.use('nl');
        break;
      case "en":
        this.languageicon = 'gb';
        this.translate.use('en');
        break;
      default:
        break;
    }
  }
}
