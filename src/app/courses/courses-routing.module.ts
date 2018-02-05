import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CoursesComponent } from './courses/courses.component';
import { CoursesListComponent } from './courses-list/courses-list.component';

const routes: Routes = [
  {
    path: '',
    component: CoursesComponent,
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
export class CoursesRoutingModule {}
