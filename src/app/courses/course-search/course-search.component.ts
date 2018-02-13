import { CourseDialogComponent } from './../course-dialog/course-dialog.component';
import { CourseType, Course } from '../shared/models/course.model';
import { MatDialog } from '@angular/material';
import { CoursesService } from '../shared/services/courses.service';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'epam-course-search',
  templateUrl: './course-search.component.html',
  styleUrls: ['./course-search.component.scss']
})
export class CourseSearchComponent implements OnInit {

  public searchText$: Observable<string>;
  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog,
    private coursesService: CoursesService) { }

  public ngOnInit() {
    this.searchText$ = this.route.queryParams.map((params: Params) => {
      return params['query'] ? params['query'] : '';
    });
  }

  public search(searchText: string) {
    this.router.navigate(['courses'], { queryParams: { query: searchText } });
  }

  public createCourse() {
    this.router.navigate(['courses/new']);
    // const courseDialogRef = this.dialog.open(CourseDialogComponent, {
    //   data: {
    //     course: {
    //       type: CourseType.VIDEO,
    //       videoDetails: {}
    //     }
    //   }
    // })
    // courseDialogRef.afterClosed().subscribe((courseAfterChanges: Course) => {
    //   if (courseAfterChanges) {
    //     this.coursesService.add(courseAfterChanges);
    //   }
    // })
  }

}
