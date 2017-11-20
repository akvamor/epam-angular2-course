export interface Course {
  type: CourseType,
  title: string,
  description: string,
  date: number,
  order: number,
  videoDetails: VideoDetails
}

export enum CourseType {
  VIDEO = 'video'
};

export interface VideoDetails {
  length: number
}
