
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserprofileComponent} from './components/user/userprofile/userprofile.component';
import {HomeComponent} from './components/general/home/home.component';
import {JobofferlistComponent} from './components/joboffer/Offerslist/jobofferlist.component';
import {JobofferComponent} from './components/joboffer/joboffer/joboffer.component';
import {RegisterComponent} from './components/user/register/register.component';
import {ApplyComponent} from './components/joboffer/apply/apply.component';


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
    path: 'joboffers/:id/apply',
    component: ApplyComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
