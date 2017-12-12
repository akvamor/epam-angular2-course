import { AuthService } from './../core/auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'epam-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements OnInit {

  constructor(public authService: AuthService) { }

  ngOnInit() {  }

}
