import { CourseDetailsComponent } from './../course-details/course-details.component';
import { AngularFirestoreCollection, QueryFn } from 'angularfire2/firestore';
import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Observable, ObservableInput } from 'rxjs/Observable';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

import { Course } from './../shared/course.model';
import { CoursesService } from './../shared/courses.service';
import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'epam-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent implements OnInit {
  public courses$: ObservableInput<Course[]>;

  constructor(public dialog: MatDialog, private coursesService: CoursesService, private route: ActivatedRoute) { }

  public ngOnInit() {
    this.courses$ = this.coursesService.findCoursesBySearchText(
      this.route.queryParams.map((params: Params) => {
        return params['query'] ? params['query'] : '';
      }));
  }

  public delete(course: Course) {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        message: 'Do you really want to delete this course?',
        width: '200px',
        height: '200px',
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.coursesService.delete(course.id);
      }
    });
  }

  public edit(course: Course) {
    const courseDialogRef = this.dialog.open(CourseDetailsComponent, {
      data: {
        course: course
      }
    });
    courseDialogRef.afterClosed().subscribe((courseAfterChanges: Course) => {
      if (courseAfterChanges) {
        this.coursesService.update(courseAfterChanges.id, courseAfterChanges);
      }
    });
  }
}
