import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {CoursesService} from '@app/courses/shared/services/courses.service';
import {CoursesActionTypes, LoadSuccessCoursesAction} from '@app/courses/shared/store/actions/courses.action';
import {exhaustMap, map} from 'rxjs/operators';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class CoursesEffects {

  @Effect()
  public loadCourses$ = this.actions$.ofType(CoursesActionTypes.Load).pipe(
    exhaustMap(() => this.coursesService.findCoursesByCourseFilter(Observable.of({})).pipe(
      map((paging) => new LoadSuccessCoursesAction(paging.courses))
    ))
  );

  constructor(private actions$: Actions,
              private coursesService: CoursesService) {
  }
}
