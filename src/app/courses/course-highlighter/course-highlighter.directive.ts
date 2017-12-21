import { element } from 'protractor';
import { Course } from './../shared/course.model';
import { Directive, Input, ElementRef, HostBinding } from '@angular/core';
import { OnChanges } from '@angular/core/src/metadata/lifecycle_hooks';

import * as moment from 'moment';

@Directive({
  selector: '[epamCourseHighlighter]'
})
export class CourseHighlighterDirective implements OnChanges {

  @Input() course: Course;
  @HostBinding('class.epam-course-highlighter') isHighlighted: boolean;
  @HostBinding('class.epam-course-highlighter-new') isNew: boolean;
  @HostBinding('class.epam-course-highlighter-upcoming') isUpcoming: boolean;

  get courseClass() { return 'epam-course-highlighter-highlight'};

  ngOnChanges() {
    if (!this.course.date) {
      this.isNew = false;
      this.isUpcoming = false;
      this.isHighlighted = false;
      return;
    }
    this.isNew = moment(this.course.date).isBetween(moment().subtract(14, 'days'), moment());
    this.isUpcoming = moment(this.course.date).isAfter(moment());
    this.isHighlighted = this.isNew || this.isUpcoming;
  }

}
