import {inject, TestBed} from '@angular/core/testing';

import {CoursesGuard} from './courses.guard';
import {Store} from '@ngrx/store';

describe('CoursesGuard', () => {
  let storeMock;

  beforeEach(() => {
    storeMock = {};
    TestBed.configureTestingModule({
      providers: [CoursesGuard,
        {provide: Store, useValue: storeMock},
      ]
    });
  });

  it('should ...', inject([CoursesGuard], (guard: CoursesGuard) => {
    expect(guard).toBeTruthy();
  }));
});
