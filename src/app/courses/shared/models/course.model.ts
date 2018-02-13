export interface Course {
  id?: string,
  type?: CourseType,
  title?: string,
  description?: string,
  date?: Date,
  order?: number,
  videoDetails?: VideoDetails
}

export enum CourseType {
  VIDEO = 'video'
};

export interface VideoDetails {
  length: number
}
