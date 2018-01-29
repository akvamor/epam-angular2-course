import * as firebase from 'firebase';

import { Course } from './course.model';

export class CourseFilter {
  searchText?: string;
  paginator?: Paginator;
  date?: Date;
  dateEqualOperator?: EqualOperator;
}

export class PagingCoursesData {
  constructor(
    public courses: Course[],
    public paginator: Paginator,
    public historyDocs: firebase.firestore.DocumentSnapshot[]) { }
  lastDoc(): firebase.firestore.DocumentSnapshot {
    return this.historyDocs[this.historyDocs.length - 1];
  }
  prevFirstDoc(): firebase.firestore.DocumentSnapshot {
    const index = this.paginator.limit * (this.paginator.index - 1) - 1;
    return this.historyDocs[index];
  }
}

export class Paginator {
  limit: number;
  direction?: EqualOperator;
  index: number;
  lastDoc?: any;
  prevFirstDoc?: any;
  historyDocs: firebase.firestore.DocumentSnapshot[];
}

export enum EqualOperator {
  MORE = 'MORE',
  LESS = 'LESS'
}
