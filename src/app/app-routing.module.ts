import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { ContentComponent } from './content/content.component';

const routes: Routes = [
  {
    path :'',
    redirectTo : 'home',
    pathMatch : 'full'
  },
  {
    path : 'home',
    component:HomepageComponent
  },
  {
    path : 'content/:id',
    component:ContentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
