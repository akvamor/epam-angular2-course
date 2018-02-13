import { Course } from '../shared/models/course.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'epam-course-dialog',
  templateUrl: './course-dialog.component.html',
  styleUrls: ['./course-dialog.component.scss']
})
export class CourseDialogComponent implements OnInit {

  public course: Course;

  constructor(
    public dialogRef: MatDialogRef<CourseDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public ngOnInit() {
    if (!this.data.course) {
      this.dialogRef.close(false);
    } else {
      this.course = this.data.course;
    }
  }

  public submit(course: Course) {
    this.dialogRef.close(course);
  }

}
