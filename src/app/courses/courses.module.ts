import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';
import { CourseFormComponent } from './course-form/course-form.component';
import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesService } from './shared/courses.service';
import { CourseHighlighterDirective } from './course-highlighter/course-highlighter.directive';
import { DurationPipe } from './shared/duration/duration.pipe';
import { CourseOrderPipe } from './shared/course-order/course-order.pipe';

@NgModule({
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
  ],
  declarations: [
    CoursesComponent,
    CourseDetailsComponent,
    CourseFormComponent,
    CoursesListComponent,
    CourseHighlighterDirective,
    DurationPipe,
    CourseOrderPipe,
  ],
  providers: [
    CoursesService,
  ]
})
export class CoursesModule {
  constructor() {}
}
