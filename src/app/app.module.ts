import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialcustomModule } from './materialcustom/materialcustom.module';
import { UserprofileComponent } from './components/student/userprofile/userprofile.component';
import { HomeComponent } from './components/general/home/home.component';
import { RegisterComponent } from './components/student/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { JobofferlistComponent } from './components/joboffer/Offerslist/jobofferlist.component';
import { LoginComponent } from './components/student/login/login.component';
import { UsereditprofileComponent } from './components/student/usereditprofile/usereditprofile.component';
import { ApplyComponent } from './components/joboffer/apply/apply.component';
import { JobofferComponent } from './components/joboffer/joboffer/joboffer.component';
import { CompanyComponent } from './components/general/company/company/company.component';
import { AddjobofferComponent } from './components/joboffer/addjoboffer/addjoboffer.component';
import { EditjobofferComponent } from './components/joboffer/editjoboffer/editjoboffer.component';
import { CompanyFilterDialogComponent } from './components/joboffer/companyfilterdialog/companyfilterdialog.component';
import { OwnjoboffersComponent } from './components/joboffer/ownjoboffers/ownjoboffers.component';
import { EditSkillsComponent } from './components/joboffer/editskills/editskills.component';
import { AuthenticationInterceptor } from "./interceptors/authentication/authentication.interceptor";
import {AsyncPipe} from "@angular/common";
import {HashLocationStrategy, LocationStrategy, PathLocationStrategy} from "@angular/common";
import { FlexLayoutModule } from "@angular/flex-layout";
import { UserjoboffersComponent } from './components/student/userjoboffers/userjoboffers.component';
import { MatSortModule, MatTableModule } from '@angular/material';
import { ReviewComponent } from './components/review/review.component';
import { ReviewContainerComponent } from './components/general/review-container/review-container.component';
import { WriteReviewComponent } from './components/general/write-review/write-review.component';
import { MatBadgeModule } from "@angular/material";
import { PaymentComponent } from "./components/general/company/payment/payment.component";
import {ngfModule} from "angular-file";
import {AngularFireDatabaseModule} from "@angular/fire/database";
import {AngularFireAuthModule} from "@angular/fire/auth";
import {AngularFireMessagingModule} from "@angular/fire/messaging";
import {AngularFireModule} from "@angular/fire";
import {environment} from "../environments/environment";
import {MessagingService} from "./services/messaging/messaging.service";
import { TopOfDaysComponent } from './components/joboffer/topofdays/topofdays.component';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";

@NgModule({
  declarations: [
    AppComponent,
    UserprofileComponent,
    HomeComponent,
    JobofferlistComponent,
    JobofferComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    UsereditprofileComponent,
    RegisterComponent,
    ApplyComponent,
    CompanyComponent,
    AddjobofferComponent,
    EditjobofferComponent,
    CompanyFilterDialogComponent,
    OwnjoboffersComponent,
    EditSkillsComponent,
    UserjoboffersComponent,
    ReviewComponent,
    ReviewContainerComponent,
    WriteReviewComponent,
    EditSkillsComponent,
    PaymentComponent,
    TopOfDaysComponent
  ],
  imports: [
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialcustomModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ngfModule,
    FlexLayoutModule,
    MatSortModule,
    MatTableModule,
    MatBadgeModule,
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    AngularFireMessagingModule,
    AngularFireModule.initializeApp(environment.firebase),
    CKEditorModule
  ],
  entryComponents: [
    CompanyFilterDialogComponent,
  ],
  providers: [
    PathLocationStrategy,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    },
    MessagingService,
    AsyncPipe,
    {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
