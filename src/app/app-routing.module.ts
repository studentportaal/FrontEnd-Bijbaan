import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserprofileComponent } from './components/user/userprofile/userprofile.component';
import { HomeComponent } from './components/general/home/home.component';
import { RegisterComponent } from './components/user/register/register.component';
import { JobofferlistComponent } from './components/joboffer/Offerslist/jobofferlist.component';
import { LoginComponent } from './components/user/login/login.component';
import { JobofferComponent } from './components/joboffer/joboffer/joboffer.component';
import { ApplyComponent } from './components/joboffer/apply/apply.component';
import { CompanyComponent } from "./components/general/company/company/company.component";



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
    path: 'joboffers/:id',
    component: JobofferComponent,
  },
  {
    path: 'joboffers/:id/apply',
    component: ApplyComponent
  },
  {
    path: 'user/login',
    component: LoginComponent
  },
  {
    path: 'company/:id',
    component: CompanyComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
