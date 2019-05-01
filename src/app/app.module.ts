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
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import { JobofferlistComponent } from './components/joboffer/Offerslist/jobofferlist.component';
import { LoginComponent } from './components/student/login/login.component';
import { UsereditprofileComponent } from './components/student/usereditprofile/usereditprofile.component';
import { ApplyComponent } from './components/joboffer/apply/apply.component';
import {JobofferComponent} from  './components/joboffer/joboffer/joboffer.component';
import {CompanyComponent} from './components/general/company/company/company.component';
import { EditjobofferComponent } from './components/joboffer/editjoboffer/editjoboffer.component';
import { CompanyfilterdialogComponent } from './components/joboffer/companyfilterdialog/companyfilterdialog.component';


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
    EditjobofferComponent,
    CompanyfilterdialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialcustomModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [ HttpClient ]
      }
    })
  ],
  entryComponents: [
    CompanyfilterdialogComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// required for AOT compilation
export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
