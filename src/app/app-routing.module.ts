import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserprofileComponent } from './components/user/userprofile/userprofile.component';
import { HomeComponent } from './components/general/home/home.component';
import { RegisterComponent } from './components/user/register/register.component';
import { JobofferlistComponent } from './components/joboffer/Offerslist/jobofferlist.component';
import {LoginComponent} from './components/user/login/login.component';

const routes: Routes = [

    {
      path: '',
      component: HomeComponent,

    },
    {
      path: 'user/view-profile/:uuid',
      component: UserprofileComponent,
    },
    {
      path: 'user/register',
      component: RegisterComponent
    },
    {
      path: 'joboffers',
      component: JobofferlistComponent
    },
    {
      path: 'user/login',
      component: LoginComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
