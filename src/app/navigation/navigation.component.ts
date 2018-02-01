import { Observable } from 'rxjs/Observable';
import { BreadCrumb } from './breadcrumb';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';

import { AuthService } from './../core/auth/auth.service';

@Component({
  selector: 'epam-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NavigationComponent implements OnInit {

  public breadcrumbs$: Observable<BreadCrumb[]>;

  constructor(public authService: AuthService, public router: Router, public activatedRoute: ActivatedRoute) { }

  public ngOnInit() {
    this.breadcrumbs$ = this.router.events
    .filter(event => event instanceof NavigationEnd)
    .map(event => this.buildBreadCrumb(this.activatedRoute.root));
  }

  private buildBreadCrumb(route: ActivatedRoute, url: string = '',
                breadcrumbs: Array<BreadCrumb> = []): Array<BreadCrumb> {
                  debugger;
    if (!route.routeConfig) {
      return [];
    }
    const label = route.routeConfig ? route.routeConfig.data[ 'breadcrumb' ] : 'Home';
    const path = route.routeConfig ? route.routeConfig.path : '';
    const nextUrl = `${url}${path}/`;
    const breadcrumb = {
        label: label,
        url: nextUrl
    };
    const newBreadcrumbs = [ ...breadcrumbs, breadcrumb ];
    if (route.firstChild) {
        return this.buildBreadCrumb(route.firstChild, nextUrl, newBreadcrumbs);
    }
    return newBreadcrumbs;
}
}
