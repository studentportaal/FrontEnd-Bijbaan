import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialcustomModule } from './materialcustom/materialcustom.module';
import { UserprofileComponent } from './components/user/userprofile/userprofile.component';
import { HomeComponent } from './components/general/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    UserprofileComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialcustomModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
