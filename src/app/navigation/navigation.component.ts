import {Observable} from 'rxjs/Observable';
import {BreadCrumb} from './breadcrumb';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';

import {AuthService} from './../core/auth/auth.service';

@Component({
  selector: 'epam-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {

  public breadcrumbs$: Observable<BreadCrumb[]>;
  public logo = 'LOGO';

  constructor(public authService: AuthService, public router: Router, public activatedRoute: ActivatedRoute) {
  }

  public ngOnInit() {
    this.breadcrumbs$ = this.router.events
      .filter(event => event instanceof NavigationEnd)
      .map(() => this.buildBreadCrumb(this.activatedRoute.root));
  }

  private buildBreadCrumb(route: ActivatedRoute, url: string = '',
                          breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
    let label = route.routeConfig && route.routeConfig.data && route.routeConfig.data['breadcrumb'];
    const path = route.routeConfig ? route.routeConfig.path : '';
    let nextUrl = `${url}${path}/`;

    Array.from(route.snapshot.paramMap.keys).forEach((key) => {
      const value = route.snapshot.paramMap.get(key);
      nextUrl = nextUrl.replace(`:${key}`, value);
      label += ` ${value}`;
    });
    const breadcrumb = {
      label: label,
      url: nextUrl
    };
    let newBreadcrumbs;
    if (label) {
      newBreadcrumbs = [...breadcrumbs, breadcrumb];
    } else {
      newBreadcrumbs = [...breadcrumbs];
    }
    if (route.firstChild) {
      return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
  }
}
