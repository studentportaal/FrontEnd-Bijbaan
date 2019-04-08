import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserprofileComponent} from './components/user/userprofile/userprofile.component';
import {HomeComponent} from './components/general/home/home.component';
import {JobofferlistComponent} from './components/joboffer/Offerslist/jobofferlist.component';
import {JobofferComponent} from './components/joboffer/joboffer/joboffer.component';
import { RegisterComponent } from './components/user/register/register.component';
import {CompanyComponent} from './components/general/company/company/company.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'user/view-profile/:id',
    component: UserprofileComponent,
  }, {path: 'joboffers', component: JobofferlistComponent},
  {
    path: 'joboffers/:id',
    component: JobofferComponent,
  },
  {
    path: 'company/:id',
    component: CompanyComponent,
  },
    {
      path: '',
      component: HomeComponent,
    },
    {
      path: 'user/view-profile/:uuid',
      component: UserprofileComponent,
    },
    {
      path: 'user/regster',
      component: RegisterComponent
    },
    {
      path: 'joboffers',
      component: JobofferlistComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
