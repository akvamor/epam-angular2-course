import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration'
})
export class DurationPipe implements PipeTransform {

  transform(minutes: number, args?: any): string {
    const hours = Math.floor(minutes / 60);
    if (hours) {
      return `${hours}h ${minutes - (hours * 60)}min`;
    } else {
      return `${minutes}min`;
    }
  }

}
