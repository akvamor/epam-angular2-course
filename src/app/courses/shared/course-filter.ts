export interface CourseFilter {
  date?: Date;
  dateEqualOperator?: EqualOperator;
}

export enum EqualOperator {
  MORE, LESS
}
