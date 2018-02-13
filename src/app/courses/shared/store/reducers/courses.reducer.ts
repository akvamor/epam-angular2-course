import {CoursesState} from '@app/courses/shared/store';
import {CoursesAction, CoursesActionTypes} from '@app/courses/shared/store/actions/courses.action';

export const initialCourseState: CoursesState = {
  collection: [],
};

export function coursesReducer(state = initialCourseState, action: CoursesAction): CoursesState {
  switch (action.type) {
    case CoursesActionTypes.LoadFailure: {
      return {
        ...state,
        loadError: action.payload
      }
    }
    case CoursesActionTypes.LoadSuccess: {
      return {
        ...state,
        collection: action.payload
      };
    }
    default: {
      return state;
    }
  }
}
