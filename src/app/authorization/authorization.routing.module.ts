import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthorizationComponent } from './authorization/authorization.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthorizationComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthorizationRoutingModule { }
