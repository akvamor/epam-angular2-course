import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@app/core/auth.guard';
import { AuthorizationModule } from '@app/authorization/authorization.module';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'courses',
    pathMatch: 'full'
  },
  {
    path: 'courses',
    loadChildren: 'app/courses/courses.module#CoursesModule',
    canActivateChild: [AuthGuard]
  },
  {
    path: 'login',
    loadChildren: 'app/authorization/authorization.module#AuthorizationComponent'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true }), AuthorizationModule],
  exports: [RouterModule, AuthorizationModule]
})
export class AppRoutingModule {}
