import { CoursesService } from './../shared/courses.service';
import { CourseType, Course } from './../shared/course.model';
import { CourseDetailsComponent } from './../course-details/course-details.component';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'epam-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {

  public searchText$: Observable<string>;

  constructor(private route: ActivatedRoute, private router: Router, public dialog: MatDialog,
    private coursesService: CoursesService) { }

  public ngOnInit() {
    this.searchText$ = this.route.queryParams.map((params: Params) => {
      return params['query'] ? params['query'] : '';
    });
  }

  public search(searchText: string) {
    this.router.navigate(['courses/list'], { queryParams: { query: searchText } });
  }

  public createCourse() {
    const courseDialogRef = this.dialog.open(CourseDetailsComponent, {
      data: {
        course: {
          type: CourseType.VIDEO,
          videoDetails: {}
        }
      }
    })
    courseDialogRef.afterClosed().subscribe((courseAfterChanges: Course) => {
      if (courseAfterChanges) {
        this.coursesService.add(courseAfterChanges);
      }
    })
  }

}
