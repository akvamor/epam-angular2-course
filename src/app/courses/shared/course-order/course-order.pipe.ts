import { Pipe, PipeTransform } from '@angular/core';

import { Course } from './../course.model';

@Pipe({
  name: 'courseOrder'
})
export class CourseOrderPipe implements PipeTransform {

  public transform(courses: Array<Course>, field: string, direction: string): Array<Course> {
    if (!courses) {
      return courses;
    }
    return courses.sort(this.getCompareFn(field, direction));
  }

  private getCompareFn(field: string, direction: string) {
    return (a: Course, b: Course) => {
      switch (direction) {
        case 'asc':
          if (a[field] < b[field]) {
            return -1;
          }
          if (a[field] > b[field]) {
            return 1;
          }
          break;
        default:
        if (a[field] > b[field]) {
          return -1;
        }
        if (a[field] < b[field]) {
          return 1;
        }
        break;
      }
      return 0;
    }
  }
}
