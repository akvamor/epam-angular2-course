import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    data: {
      breadcrumb: 'Courses',
    },
    children: [{
      path: '',
      redirectTo: 'list',
      pathMatch: 'full',
    }, {
      path: 'list',
      component: CoursesListComponent,
      data: {
        title: 'Courses',
        breadcrumb: 'List',
      }
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {}
