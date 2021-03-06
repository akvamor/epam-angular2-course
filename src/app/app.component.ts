import { Component, HostBinding, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { OverlayContainer } from '@angular/cdk/overlay';

const DEFAULT_THEME = 'default-theme';

@Component({
  selector: 'epam-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent  implements OnInit {
  @HostBinding('class') componentCssClass;

  constructor(public overlayContainer: OverlayContainer) {}

  public ngOnInit(): void {
    this.componentCssClass = DEFAULT_THEME;
    this.overlayContainer.getContainerElement().classList.add(DEFAULT_THEME);
  }
}
