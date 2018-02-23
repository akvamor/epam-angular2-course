import {inject, TestBed} from '@angular/core/testing';

import {CoursesService} from './courses.service';
import {AFSDecorator} from '@app/shared/afs.decorator';
import {AngularFirestore} from 'angularfire2/firestore';
import {Observable} from 'rxjs/Observable';
import createSpyObj = jasmine.createSpyObj;

describe('CoursesService', () => {
  let afsdMock;
  let afsMock;
  let snapshot;
  let observable;

  beforeEach(() => {
    afsdMock = {};
    snapshot = createSpyObj('snapshot', ['valueChanges']);
    afsMock = createSpyObj('afs', ['collection']);
    observable = Observable.of(1);

    TestBed.configureTestingModule({
      providers: [
        CoursesService,
        {provide: AngularFirestore, useValue: afsMock},
        {provide: AFSDecorator, useValue: afsdMock},
      ]
    });
  });

  it('should be created', inject([CoursesService], (service: CoursesService) => {
    expect(service).toBeTruthy();
  }));

  describe('totalCount', () => {
    it('should calls with correct arguments', inject([CoursesService], (service: CoursesService) => {
      const total = 1;
      afsMock.collection.and.returnValue(snapshot);
      snapshot.valueChanges.and.returnValue(observable);

      service.totalCount();

      expect(afsMock.collection).toHaveBeenCalledWith(CoursesService.COLLECTION_NAME);
    }))
  })

});
