import { Component, OnInit } from '@angular/core';

import { AuthService } from './../core/auth/auth.service';

@Component({
  selector: 'epam-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  constructor(public auth: AuthService) { }

  public ngOnInit() { }

}
