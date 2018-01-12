import { CourseFilter, EqualOperator } from './course-filter';
import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ObservableInput } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import * as moment from 'moment';

// firebase
import * as firebase from 'firebase';

import { Course } from './course.model';
import { AFSDecorator } from '@app/shared/afs.decorator';

@Injectable()
export class CoursesService {
  public static get COLLECTION_NAME(): string { return 'courses'; }

  constructor(private afs: AngularFirestore, private afsd: AFSDecorator<Course>) { }

  public findCoursesBySearchText(query$: Observable<string>, filter$?: Observable<CourseFilter>): Observable<Course[]> {
    const courses$ = query$.switchMap((query) => this.afs.collection(CoursesService.COLLECTION_NAME,
      (ref: firebase.firestore.CollectionReference) => {
        let queryRef = ref.orderBy('title');
        if (query && query.length) {
          queryRef = queryRef.startAt(query).endAt(query + '\uf8ff');
        }
        return queryRef;
      })
      .snapshotChanges()
      .map(actions => actions.map(action => {
        const data = action.payload.doc.data() as Course;
        const id = action.payload.doc.id;
        return { id, ...data };
      })));

    if (filter$) {
      return filter$.switchMap((courseFilter) => {
        if (courseFilter) {
          return this.addCoursesFilter(courses$, courseFilter);
        } else {
          return courses$;
        }
      });
    } else {
      return courses$;
    }
  }

  public add(course: Course) {
    return this.afsd.addDocument(CoursesService.COLLECTION_NAME, course)
  }

  public create(courseId: string, course: Course) {
    return this.afsd.createDocument(CoursesService.COLLECTION_NAME, courseId, course);
  }

  public get(courseId: string): AngularFirestoreDocument<Course> {
    return this.afsd.getDocument(CoursesService.COLLECTION_NAME, courseId);
  }

  public update(courseId: string, course: Course) {
    this.afsd.updateDocument(CoursesService.COLLECTION_NAME, courseId, course);
  }

  public delete(courseId: string) {
    this.afsd.deleteDocument(CoursesService.COLLECTION_NAME, courseId);
  }

  private addCoursesFilter(courses$: Observable<Course[]>, courseFilter: CourseFilter) {
    return courses$.map((courses) => {
      if (courseFilter.date) {
        return courses.filter((course) => {
          switch (courseFilter.dateEqualOperator) {
            case EqualOperator.MORE:
              return moment(course.date.getTime()).isBefore(moment(courseFilter.date.getTime()));
            case EqualOperator.LESS:
            default:
              return moment(course.date.getTime()).isAfter(moment(courseFilter.date.getTime()));
          }
        })
      } else {
        return courses;
      }
    })
  }
}
