import { Course } from './../shared/course.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';

@Component({
  selector: 'epam-course-details',
  templateUrl: './course-details.component.html',
  styleUrls: ['./course-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CourseDetailsComponent implements OnInit {

  public course: Course;

  constructor(
    public dialogRef: MatDialogRef<CourseDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public ngOnInit() {
    if (!this.data.course) {
      this.dialogRef.close(false);
    } else {
      this.course = {...this.data.course}
    }
  }
}
