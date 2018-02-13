import {Action} from '@ngrx/store';
import {Course} from '@app/courses/shared/models/course.model';

export enum CoursesActionTypes {
  Load = '[Courses] Load',
  LoadSuccess = '[Courses] Load Success',
  LoadFailure = '[Courses] Load Failure',
}

export class LoadCoursesAction implements Action {
  readonly type = CoursesActionTypes.Load;
}

export class LoadSuccessCoursesAction implements Action {
  readonly type = CoursesActionTypes.LoadSuccess;

  constructor(public payload: Course[]) {
  };
}

export class LoadFailureCoursesAction implements Action {
  readonly type = CoursesActionTypes.LoadFailure;

  constructor(public payload: string) {
  };
}

export type CoursesAction =
  | LoadCoursesAction
  | LoadSuccessCoursesAction
  | LoadFailureCoursesAction;
