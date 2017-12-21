import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'epam-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailsComponent implements OnInit {

  constructor() { }

  public ngOnInit() { }
}
