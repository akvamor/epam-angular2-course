import {CourseHighlighterDirective} from './course-highlighter.directive';
import moment = require('moment');

describe('CourseHighlighterDirective', () => {
  it('should create an instance', () => {
    const directive = new CourseHighlighterDirective();
    expect(directive).toBeTruthy();
  });

  describe('ngOnChanges', () => {
    it('should update property values', function () {
      const directive = new CourseHighlighterDirective();
      directive.course = {
        date: moment().subtract(2, 'days').toDate(),
      };

      directive.ngOnChanges();

      expect(directive.isNew).toBeTruthy();
      expect(directive.isUpcoming).toBeFalsy();
      expect(directive.isHighlighted).toBeTruthy();
    });
  })
});
