import {CourseCreateComponent} from './course-create/course-create.component';
import {CourseEditComponent} from './course-edit/course-edit.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {CoursesComponent} from './courses/courses.component';
import {CoursesListComponent} from './courses-list/courses-list.component';
import {CoursesGuard} from '@app/courses/shared/services/courses.guard';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
    canActivate: [CoursesGuard],
    children: [{
      path: '',
      component: CoursesListComponent,
    }, {
      path: 'edit/:id',
      component: CourseEditComponent,
      data: {
        breadcrumb: 'Course Id:'
      }
    }, {
      path: 'new',
      component: CourseCreateComponent,
      pathMatch: 'full',
      data: {
        breadcrumb: 'New Course'
      }
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CoursesRoutingModule {
}
