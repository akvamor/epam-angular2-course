import {RootState} from '@app/app.reducer.module';
import {Course} from '@app/courses/shared/models/course.model';
import {createFeatureSelector, createSelector} from '@ngrx/store';

export interface CoursesFeatureState extends RootState {
  courses: CoursesState
}

export interface CoursesState {
  collection: Course[];
  loadError?: string;
}

export const coursesFeatureSelector = createFeatureSelector<CoursesState>('courses');

export const coursesCollectionSelector = createSelector(coursesFeatureSelector, (coursesState) => coursesState.collection);
