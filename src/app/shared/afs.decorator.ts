import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class AFSDecorator<T> {

  constructor(private afs: AngularFirestore) { }

  createDocument(collectionObj: string, docID: string, dataObj: T) {
    return this.afs
      .collection(collectionObj)
      .doc(docID)
      .set(dataObj);
  }

  getDocument(collectionObj: string, docId: string): AngularFirestoreDocument<T> {
    return this.afs.collection<T>(collectionObj).doc(docId);
  }

  getDocuments(collectinObj: string): AngularFirestoreCollection<T> {
    return this.afs.collection<T>(collectinObj);
  }

  addDocument(collectionObj: string, dataObj: T): void {
    this.afs.collection(collectionObj).add(dataObj);
  }

  deleteDocument(collectionObj: string, docID: string): void {
    this.afs
      .collection(collectionObj)
      .doc(docID)
      .delete();
  }

  updateDocument(collectionObj: string, docID: string, dataObj: T): void {
    this.afs
      .collection(collectionObj)
      .doc(docID)
      .update(dataObj);
  }
}
