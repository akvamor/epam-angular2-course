import { Component, OnInit } from '@angular/core';

import { AuthService } from './../core/auth/auth.service';

@Component({
  selector: 'epam-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public authService: AuthService) { }

  public ngOnInit() { }

}
