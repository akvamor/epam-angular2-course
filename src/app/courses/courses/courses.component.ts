import { CoursesService } from '../shared/services/courses.service';
import { CourseType, Course } from '../shared/models/course.model';
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

  constructor() { }

  public ngOnInit() { }


}
