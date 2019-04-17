import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserprofileComponent } from './components/student/userprofile/userprofile.component';
import { HomeComponent } from './components/general/home/home.component';
import { RegisterComponent } from './components/student/register/register.component';
import { JobofferlistComponent } from './components/joboffer/Offerslist/jobofferlist.component';
import { LoginComponent } from './components/student/login/login.component';
import { JobofferComponent } from './components/joboffer/joboffer/joboffer.component';
import { ApplyComponent } from './components/joboffer/apply/apply.component';
import { CompanyComponent } from './components/general/company/company/company.component';
import { UsereditprofileComponent } from './components/user/usereditprofile/usereditprofile.component';
import {EditjobofferComponent} from './components/joboffer/editjoboffer/editjoboffer.component';




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
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'user/edit-profile/:uuid',
    component: UsereditprofileComponent,
  },
  {
    path: 'joboffers',
    component: JobofferlistComponent
  },
  {
    path: 'joboffers/:id',
    component: JobofferComponent,
  },
  {
    path: 'joboffers/:id/apply',
    component: ApplyComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'company/:id',
    component: CompanyComponent
  },
  {
    path: 'joboffers/edit/:id',
    component: EditjobofferComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
