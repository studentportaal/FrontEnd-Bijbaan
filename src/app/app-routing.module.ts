import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { componentFactoryName } from '@angular/compiler';
import { UserprofileComponent } from './components/user/userprofile/userprofile.component';
import { HomeComponent } from './components/general/home/home.component';

const routes: Routes = [

    {
      path: '',
      component: HomeComponent,
      
    },
    {
      path: 'user/view-profile/:uuid',
      component: UserprofileComponent,
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
