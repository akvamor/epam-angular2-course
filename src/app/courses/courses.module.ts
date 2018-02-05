import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CoursesComponent } from './courses/courses.component';
import { CourseDetailsComponent } from './course-details/course-details.component';

import { CoursesRoutingModule } from './courses-routing.module';
import { SharedModule } from '@app/shared/shared.module';
import { CoursesListComponent } from './courses-list/courses-list.component';
import { CoursesService } from './shared/courses.service';
import { CourseHighlighterDirective } from './course-highlighter/course-highlighter.directive';
import { DurationPipe } from './shared/duration/duration.pipe';
import { CourseOrderPipe } from './shared/course-order/course-order.pipe';
import { DateComponent } from './shared/date/date.component';
import { CourseEditComponent } from './course-edit/course-edit.component';
import { CourseCreateComponent } from './course-create/course-create.component';
import { CourseDialogComponent } from './course-dialog/course-dialog.component';
import { CourseSearchComponent } from './course-search/course-search.component';

@NgModule({
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [
    CoursesComponent,
    CourseDetailsComponent,
    CoursesListComponent,
    CourseHighlighterDirective,
    DurationPipe,
    CourseOrderPipe,
    DateComponent,
    CourseEditComponent,
    CourseCreateComponent,
    CourseDetailsComponent,
    CourseDialogComponent,
    CourseSearchComponent,
  ],
  entryComponents: [CourseDialogComponent],
  providers: [
    CoursesService,
  ]
})
export class CoursesModule {
  constructor() {}
}
