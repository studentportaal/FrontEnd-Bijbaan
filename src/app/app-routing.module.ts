import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserprofileComponent } from './components/user/userprofile/userprofile.component';
import { HomeComponent } from './components/general/home/home.component';
import { JobofferlistComponent } from './components/joboffer/Offerslist/jobofferlist.component';
import { RegisterComponent } from './components/user/register/register.component';

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
