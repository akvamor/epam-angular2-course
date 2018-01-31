import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
  public courseForm: FormGroup;
  public formErrors = {
    'title': '',
    'description': '',
    'videoDetailsLength': '',
    'order': ''
  };
  public validationMessages = {
    'title': {
      'required': 'Title is required.',
      'maxlength': 'Title cannot be more than 50 characters long.',
    },
    'description': {
      'required': 'Description is required.',
      'maxlength': 'Description cannot be more than 500 characters long.',
    },
    'videoDetails': {
      'required': 'Length is required.',
      'maxlength': 'Length cannot be more than 500 characters long.',
    },
    'order': {
      'required': 'Order is required.',
    }
  };
  public serverMessage = new BehaviorSubject<string>(null);

  constructor(
    public dialogRef: MatDialogRef<CourseDetailsComponent>,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  public ngOnInit() {
    if (!this.data.course) {
      this.dialogRef.close(false);
    } else {
      this.course = {...this.data.course}
    }
    this.buildForm();
  }

  public buildForm() {
    this.courseForm = this.fb.group({
      'title': ['', [
        Validators.required,
        Validators.maxLength(50),
      ]],
      'description': ['', [
        Validators.required,
        Validators.maxLength(500),
      ]],
      'videoDetails': ['', [Validators.required]],
      'date': ['', [Validators.required]],
      'order': ['', [Validators.required]]
    });

    this.courseForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }

  public onValueChanged(data?: any) {
    this.serverMessage.next(null);
    if (!this.courseForm) { return; }
    const form = this.courseForm;
    Object.keys(this.formErrors).forEach((field) => {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        Object.keys(control.errors).forEach((key) => {
          this.formErrors[field] += messages[key] + ' ';
        });
      }
    });
  }

  public submit() {
    const course = Object.assign({}, this.course, {
      date: this.courseForm.controls.date.value,
      title: this.courseForm.controls.title.value,
      description: this.courseForm.controls.description.value,
      order: this.courseForm.controls.order.value,
      videoDetails: {
        length: this.courseForm.controls.videoDetails.value
      }
    })
    this.dialogRef.close(course);
  }
}
