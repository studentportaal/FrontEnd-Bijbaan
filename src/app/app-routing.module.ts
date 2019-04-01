import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserprofileComponent} from './components/user/userprofile/userprofile.component';
import {HomeComponent} from './components/general/home/home.component';
import {JobofferlistComponent} from './components/joboffer/Offerslist/jobofferlist.component';

const routes: Routes = [

  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'user/view-profile/:id',
    component: UserprofileComponent,
  }, {path: 'joboffers', component: JobofferlistComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
