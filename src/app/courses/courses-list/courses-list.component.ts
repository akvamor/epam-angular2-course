import { AngularFirestoreCollection, QueryFn } from 'angularfire2/firestore';
import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs/Observable';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Course } from './../shared/course.model';
import { CoursesService } from './../shared/courses.service';

@Component({
  selector: 'epam-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent implements OnInit {
  public courses$: ObservableInput<Course[]>;

  constructor(private coursesService: CoursesService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.courses$ = this.coursesService.findCoursesBySearchText(
      this.route.queryParams.map((params: Params) => {
        return params['query'] ? params['query'] : '';
      }));
  }

  delete(course: Course) {
    console.log(course);
    // TODO: remove course.
  }

  edit(course: Course) {
    console.log(course);
    // TODO: add course.
  }
}
