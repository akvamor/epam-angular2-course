import { Subject } from 'rxjs/Subject';
import { CourseFilter, EqualOperator, PagingCoursesData, Paginator } from './../shared/course-filter';
import { CourseDetailsComponent } from './../course-details/course-details.component';
import { AngularFirestoreCollection, QueryFn } from 'angularfire2/firestore';
import { Component, OnInit, Input, ChangeDetectionStrategy, EventEmitter, Output } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSlideToggleChange, PageEvent } from '@angular/material';
import { Observable, ObservableInput } from 'rxjs/Observable';
import { ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';
import { combineLatest } from 'rxjs/observable/combineLatest';
import * as moment from 'moment';

import { Course } from './../shared/course.model';
import { CoursesService } from './../shared/courses.service';
import { ConfirmDialogComponent } from './../../shared/confirm-dialog/confirm-dialog.component';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { switchMap } from 'rxjs/operator/switchMap';
import { map } from 'rxjs/operator/map';

@Component({
  selector: 'epam-courses-list',
  templateUrl: './courses-list.component.html',
  styleUrls: ['./courses-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesListComponent implements OnInit {
  readonly limit = 2;
  public defaultPaginator: Paginator = {
    limit: this.limit,
    index: 0,
    historyDocs: [],
  };
  public courses$: Observable<PagingCoursesData>;
  public courseFilter: CourseFilter = { paginator: this.defaultPaginator };
  public totalCount$ = this.coursesService.totalCount();
  public courseFilter$ = new BehaviorSubject<CourseFilter>(this.courseFilter);
  public filterDate = false;

  constructor(public dialog: MatDialog, private coursesService: CoursesService, private route: ActivatedRoute) { }

  public ngOnInit() {
    const courseFilterWithSearchText$ = combineLatest(this.route.queryParams, this.courseFilter$).map(
      ([params, courseFilter]) => {
        const searchText = params['query'] ? params['query'] : '';
        courseFilter.searchText = searchText;
        if (courseFilter.searchText) {
          delete courseFilter.paginator;
        } else if (!courseFilter.paginator) {
          courseFilter.paginator = Object.assign({}, this.defaultPaginator);
        }
        return courseFilter;
      });
    this.courses$ = this.coursesService.findCoursesByCourseFilter(courseFilterWithSearchText$);
    this.changeFilterDate({ checked: this.filterDate } as MatSlideToggleChange);
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

  public trackFn(index, course) {
    return course ? course.id : null;
  }

  public changeFilterDate(slideToggle: MatSlideToggleChange) {
    if (slideToggle.checked) {
      this.courseFilter.date = moment().subtract(14, 'days').toDate();
      this.courseFilter.dateEqualOperator = EqualOperator.MORE;
      this.courseFilter$.next(this.courseFilter);
    } else {
      this.courseFilter.date = null;
      this.courseFilter.dateEqualOperator = null;
      this.courseFilter$.next(this.courseFilter);
    }
  }

  public changePage(pageEvent: PageEvent) {
    this.courseFilter.searchText = '';
    this.courses$.take(1).subscribe((pagingCourses: PagingCoursesData) => {

      const direction = pagingCourses.paginator.index < pageEvent.pageIndex ? EqualOperator.MORE : EqualOperator.LESS;
      const paginator = {
        limit: pageEvent.pageSize,
        index: pageEvent.pageIndex,
        direction: direction,
        lastDoc: pagingCourses.lastDoc(),
        prevFirstDoc: pagingCourses.prevFirstDoc(),
        historyDocs: pagingCourses.historyDocs,
      };
      this.courseFilter.paginator = paginator;
      this.courseFilter$.next(Object.assign({}, this.courseFilter, {paginator: paginator}));
    });
  }
}
