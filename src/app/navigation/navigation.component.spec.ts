import {async, TestBed} from '@angular/core/testing';

import {NavigationComponent} from './navigation.component';
import {SharedModule} from '@app/shared/shared.module';
import {RouterModule} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {AuthService} from '@app/core/auth/auth.service';
import {RouterTestingModule} from '@angular/router/testing';

describe('NavigationComponent', () => {
  let authServiceMock: any;

  beforeEach(async(() => {
    authServiceMock = {
      user: Observable.of({
        email: '',
      }),
      authState: Observable.of(
        {
          app: {}
        }
      )
    };

    TestBed.configureTestingModule({
      imports: [SharedModule, RouterModule, RouterTestingModule],
      declarations: [NavigationComponent],
      providers: [
        {provide: AuthService, useValue: authServiceMock},
      ]
    }).compileComponents();
  }));

  it('should create', () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    const app = fixture.debugElement.componentInstance;

    expect(app).toBeTruthy();
  });

  it(`should has as a logo 'LOGO'`, () => {
    const fixture = TestBed.createComponent(NavigationComponent);
    fixture.detectChanges();

    const app = fixture.debugElement.componentInstance;

    expect(app.logo).toEqual('LOGO');
  });

  it('should render logo in a h1 tag', (() => {
    const fixture = TestBed.createComponent(NavigationComponent);
    const app = fixture.debugElement.componentInstance;

    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h2').textContent).toContain('LOGO');
  }));
});
