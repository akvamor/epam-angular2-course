import {CourseFilter, EqualOperator, Paginator, PagingCoursesData} from '../models/course-filter';
import {Injectable} from '@angular/core';
import {Action, AngularFirestore, DocumentChangeAction} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
// firebase
import * as firebase from 'firebase';

import {Course} from '../models/course.model';
import {AFSDecorator} from 'app/shared/afs.decorator';

@Injectable()
export class CoursesService {
  constructor(private afs: AngularFirestore, private afsd: AFSDecorator<Course>) {
  }

  public static get COLLECTION_NAME(): string {
    return 'courses';
  }

  public findCoursesByCourseFilter(filter$?: Observable<CourseFilter>): Observable<PagingCoursesData> {
    return filter$.switchMap((courseFilter) => this.afs.collection(CoursesService.COLLECTION_NAME,
      (ref: firebase.firestore.CollectionReference) => {
        // First query argument
        let queryRef = ref.orderBy('date', 'desc');
        if (courseFilter.date) {
          queryRef = this.getDateRangeQuery(queryRef, courseFilter.dateEqualOperator, courseFilter.date);
        }
        if (courseFilter.searchText) {
          queryRef = this.getSearchTextQuery(ref, courseFilter.searchText);
        }
        if (!courseFilter.searchText && courseFilter.paginator) {
          queryRef = this.getPaginationQuery(queryRef, courseFilter.paginator);
        }
        return queryRef;
      })
      .snapshotChanges()
      .map(this.actionsCourseMapper(courseFilter.paginator)));
  }

  public totalCount(): Observable<number> {
    return this.afs.collection(CoursesService.COLLECTION_NAME).valueChanges().map((courses) => courses.length);
  }

  public add(course: Course) {
    return this.afsd.addDocument(CoursesService.COLLECTION_NAME, course)
  }

  public create(courseId: string, course: Course) {
    return this.afsd.createDocument(CoursesService.COLLECTION_NAME, courseId, course);
  }

  public get(courseId: string): Observable<Course> {
    return this.afsd.getDocument(CoursesService.COLLECTION_NAME, courseId)
      .snapshotChanges()
      .map((action: Action<firebase.firestore.DocumentSnapshot>) => {
        const id = action.payload.id;
        const data = action.payload.data() as Course;
        if (!data) {
          return undefined;
        }
        return {id, ...data};
      });
  }

  public update(courseId: string, course: Course) {
    delete course.id;
    this.afsd.updateDocument(CoursesService.COLLECTION_NAME, courseId, course);
  }

  public delete(courseId: string) {
    this.afsd.deleteDocument(CoursesService.COLLECTION_NAME, courseId);
  }

  private getDateRangeQuery(queryRef: firebase.firestore.Query, dateEqualOperator: EqualOperator, date: Date) {
    switch (dateEqualOperator) {
      case EqualOperator.MORE:
        queryRef = queryRef.where('date', '>=', date);
        break;
      case EqualOperator.LESS:
      default:
        queryRef = queryRef.where('date', '<=', date);
    }
    return queryRef;
  }

  private getSearchTextQuery(ref: firebase.firestore.CollectionReference, searchText: string): firebase.firestore.Query {
    return ref.orderBy('title')
      .startAt(searchText)
      .endAt(searchText + '\uf8ff');
  }

  private getPaginationQuery(queryRef: firebase.firestore.Query, paginator: Paginator): firebase.firestore.Query {
    if (paginator.lastDoc) {
      switch (paginator.direction) {
        case EqualOperator.LESS:
          if (paginator.prevFirstDoc) {
            queryRef = queryRef.startAfter(paginator.prevFirstDoc);
          }
          break;
        case EqualOperator.MORE:
        default:
          queryRef = queryRef.startAfter(paginator.lastDoc);
          break;
      }
    }
    queryRef = queryRef.limit(paginator.limit);
    return queryRef;
  }

  private actionsCourseMapper(paginator: Paginator) {
    return (documentChangeActions: DocumentChangeAction[]) => {
      const courses = documentChangeActions.map(action => {
        const data = action.payload.doc.data() as Course;
        const id = action.payload.doc.id;
        return {id, ...data};
      });
      let docs = []
      if (paginator) {
        docs = paginator.historyDocs.concat(documentChangeActions.map((action) => action.payload.doc));
      }
      return new PagingCoursesData(courses, paginator, docs);
    };
  }
}
