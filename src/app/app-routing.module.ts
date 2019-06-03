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
import { AddjobofferComponent } from './components/joboffer/addjoboffer/addjoboffer.component';
import { UsereditprofileComponent } from './components/student/usereditprofile/usereditprofile.component';
import { OwnjoboffersComponent } from "./components/joboffer/ownjoboffers/ownjoboffers.component";
import { UserjoboffersComponent } from './components/student/userjoboffers/userjoboffers.component';
import { WriteReviewComponent } from "./components/general/write-review/write-review.component";


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
    path: 'joboffers/details/:id',
    component: JobofferComponent,
  },
  {
    path: 'joboffers/details/:id/apply',
    component: ApplyComponent
  },
  {
    path: 'joboffers/add',
    component: AddjobofferComponent,
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
    path: 'users/:id/joboffers',
    component: OwnjoboffersComponent
  },
  {
    path: 'students/:id/joboffers',
    component: UserjoboffersComponent
  },
  {
    path: 'reviews/:author',
    component: WriteReviewComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
