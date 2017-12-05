import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';

// firebase
import * as firebase from 'firebase';

import { Course } from './course.model';
import { ObservableInput } from 'rxjs/Observable';

@Injectable()
export class CoursesService {
  public static get COLLECTION_NAME(): string { return 'courses'; }

  constructor(private afs: AngularFirestore) { }

  findCoursesBySearchText(query$: Observable<string>): ObservableInput<Course[]> {
    return query$.switchMap((query) => this.afs.collection(CoursesService.COLLECTION_NAME,
      (ref: firebase.firestore.CollectionReference) => {
      let queryRef = ref.orderBy('title');
      if (query && query.length) {
        queryRef = queryRef.startAt(query).endAt(query + '\uf8ff');
      }
      return queryRef;
    }).valueChanges());
  }

}
