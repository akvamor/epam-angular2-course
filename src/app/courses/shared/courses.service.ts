import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

// firebase
import * as firebase from 'firebase';

import { Course } from './course.model';
import { ObservableInput } from 'rxjs/Observable';
import { AFSDecorator } from '@app/shared/afs.decorator';

@Injectable()
export class CoursesService {
  public static get COLLECTION_NAME(): string { return 'courses'; }

  constructor(private afs: AngularFirestore, private afsd: AFSDecorator<Course>) { }

  findCoursesBySearchText(query$: Observable<string>): ObservableInput<Course[]> {
    return query$.switchMap((query) => this.afs.collection(CoursesService.COLLECTION_NAME,
      (ref: firebase.firestore.CollectionReference) => {
      let queryRef = ref.orderBy('title');
      if (query && query.length) {
        queryRef = queryRef.startAt(query).endAt(query + '\uf8ff');
      }
      return queryRef;
    }).snapshotChanges().map(actions => actions.map(action => {
      const data = action.payload.doc.data() as Course;
      const id = action.payload.doc.id;
      return {id, ...data};
    })));
  }

  create(courseId: string, course: Course) {
    return this.afsd.createDocument(CoursesService.COLLECTION_NAME, courseId, course);
  }

  get(courseId: string): AngularFirestoreDocument<Course> {
    return this.afsd.getDocument(CoursesService.COLLECTION_NAME, courseId);
  }

  update(courseId: string, course: Course) {
    this.afsd.updateDocument(CoursesService.COLLECTION_NAME, courseId, course);
  }

  delete(courseId: string) {
    this.afsd.deleteDocument(CoursesService.COLLECTION_NAME, courseId);
  }
}
