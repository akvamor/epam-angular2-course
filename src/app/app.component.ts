import { Component, HostBinding, OnInit } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

const DEFAULT_THEME = 'default-theme';

@Component({
  selector: 'epam-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements OnInit {
  @HostBinding('class') componentCssClass;

  constructor(public overlayContainer: OverlayContainer) {}

  ngOnInit(): void {
    this.componentCssClass = DEFAULT_THEME;
    this.overlayContainer.getContainerElement().classList.add(DEFAULT_THEME);
  }
}
