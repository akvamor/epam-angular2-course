import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'epam-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CoursesComponent implements OnInit {

  public searchText$: Observable<string>;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.searchText$ = this.route.queryParams.map((params: Params) => {
      return params['query'] ? params['query'] : '';
    });
  }

  search(searchText: string) {
    this.router.navigate(['courses/list'], { queryParams: { query: searchText } });
  }

}
