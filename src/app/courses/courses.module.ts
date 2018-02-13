import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {CoursesComponent} from './courses/courses.component';
import {CourseDetailsComponent} from './course-details/course-details.component';

import {CoursesRoutingModule} from './courses-routing.module';
import {SharedModule} from '@app/shared/shared.module';
import {CoursesListComponent} from './courses-list/courses-list.component';
import {CoursesService} from './shared/services/courses.service';
import {CourseHighlighterDirective} from './course-highlighter/course-highlighter.directive';
import {DurationPipe} from './shared/duration/duration.pipe';
import {CourseOrderPipe} from './shared/course-order/course-order.pipe';
import {DateComponent} from './shared/date/date.component';
import {CourseEditComponent} from './course-edit/course-edit.component';
import {CourseCreateComponent} from './course-create/course-create.component';
import {CourseDialogComponent} from './course-dialog/course-dialog.component';
import {CourseSearchComponent} from './course-search/course-search.component';
import {StoreModule} from '@ngrx/store';
import {coursesReducer} from '@app/courses/shared/store/reducers/courses.reducer';
import {CoursesGuard} from '@app/courses/shared/services/courses.guard';
import {EffectsModule} from '@ngrx/effects';
import {CoursesEffects} from '@app/courses/shared/store/effects/courses.effects';

@NgModule({
  imports: [
    CommonModule,
    CoursesRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    StoreModule.forFeature('courses', coursesReducer),
    EffectsModule.forFeature([CoursesEffects]),
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
    CoursesGuard
  ]
})
export class CoursesModule {
  constructor() {
  }
}
