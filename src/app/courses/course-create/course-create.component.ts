import { Course, CourseType } from '../shared/models/course.model';
import { CoursesService } from '../shared/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'epam-course-create',
  templateUrl: './course-create.component.html',
  styleUrls: ['./course-create.component.scss']
})
export class CourseCreateComponent implements OnInit {

  public course = {
    type: CourseType.VIDEO,
    videoDetails: {}
  };
  constructor(private coursesService: CoursesService, private router: Router) { }

  public ngOnInit() { }

  public save(course: Course) {
    this.coursesService.add(course);
    this.router.navigate(['/courses']);
  }

  public cancel() {
    this.router.navigate(['/courses']);
  }

}
