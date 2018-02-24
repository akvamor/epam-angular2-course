import { Directive, Input, ElementRef, HostBinding, OnChanges } from '@angular/core';
import * as moment from 'moment';

import { Course } from '../shared/models/course.model';

@Directive({
  selector: '[epamCourseHighlighter]'
})
export class CourseHighlighterDirective implements OnChanges {

  @Input() public course: Course;
  @HostBinding('class.epam-course-highlighter') isHighlighted: boolean;
  @HostBinding('class.epam-course-highlighter-new') isNew: boolean;
  @HostBinding('class.epam-course-highlighter-upcoming') isUpcoming: boolean;

  private get courseClass() { return 'epam-course-highlighter-highlight' };

  public ngOnChanges() {
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
