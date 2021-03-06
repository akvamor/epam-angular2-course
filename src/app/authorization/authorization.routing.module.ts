import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { AuthorizationComponent } from './authorization/authorization.component';

const routes: Routes = [
  {
    path: 'login',
    component: AuthorizationComponent,
    data: {
      breadcrumb: 'Login',
    },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)]
})
export class AuthorizationRoutingModule { }
