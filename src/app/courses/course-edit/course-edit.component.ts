import { CoursesService } from '../shared/services/courses.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Course } from '../shared/models/course.model';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'epam-course-edit',
  templateUrl: './course-edit.component.html',
  styleUrls: ['./course-edit.component.scss']
})
export class CourseEditComponent implements OnInit {

  public course$: Observable<Course>;
  constructor(private route: ActivatedRoute, private coursesService: CoursesService,
    private router: Router) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.course$ = this.coursesService.get(id);
  }

  public save(course: Course) {
    const id = course.id;
    this.coursesService.update(course.id, course);
    this.router.navigate(['/courses']);
  }

  public cancel() {
    this.router.navigate(['/courses']);
  }

}
