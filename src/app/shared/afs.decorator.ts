import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AFSDecorator<T> {

  constructor(private afs: AngularFirestore) { }

  public createDocument(collectionObj: string, docID: string, dataObj: T) {
    return this.afs
      .collection(collectionObj)
      .doc(docID)
      .set(dataObj);
  }

  public getDocument(collectionObj: string, docId: string): AngularFirestoreDocument<T> {
    return this.afs.collection<T>(collectionObj).doc(docId);
  }

  public getDocuments(collectinObj: string): AngularFirestoreCollection<T> {
    return this.afs.collection<T>(collectinObj);
  }

  public addDocument(collectionObj: string, dataObj: T): void {
    this.afs.collection(collectionObj).add(dataObj);
  }

  public deleteDocument(collectionObj: string, docID: string): void {
    this.afs
      .collection(collectionObj)
      .doc(docID)
      .delete();
  }

  public updateDocument(collectionObj: string, docID: string, dataObj: T): void {
    this.afs
      .collection(collectionObj)
      .doc(docID)
      .update(dataObj);
  }
}
