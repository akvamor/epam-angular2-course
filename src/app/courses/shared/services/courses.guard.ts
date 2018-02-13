import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {Store} from '@ngrx/store';
import {coursesCollectionSelector, CoursesState} from '@app/courses/shared/store';
import {LoadCoursesAction} from '@app/courses/shared/store/actions/courses.action';
import {map, take} from 'rxjs/operators';

@Injectable()
export class CoursesGuard implements CanActivate {
  constructor(private store: Store<CoursesState>) {
  }

  canActivate(next: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.store.dispatch(new LoadCoursesAction());
    return this.store.select(coursesCollectionSelector).pipe(
      take(1),
      map((courses) => !!courses)
    );
  }
}
