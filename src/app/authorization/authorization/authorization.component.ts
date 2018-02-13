import {Router} from '@angular/router';
import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {AuthService} from '@app/core/auth/auth.service';


@Component({
  selector: 'epam-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationComponent implements OnInit {

  public userForm: FormGroup;
  public newUser = false;
  public passReset = false;
  public formErrors = {
    'email': '',
    'password': ''
  };
  public validationMessages = {
    'email': {
      'required': 'Email is required.',
      'email': 'Email must be a valid email'
    },
    'password': {
      'required': 'Password is required.',
      'pattern': 'Password must be include at one letter and one number.',
      'minlength': 'Password must be at least 4 characters long.',
      'maxlength': 'Password cannot be more than 40 characters long.',
    }
  };
  public serverMessage = new BehaviorSubject<string>(null);

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }

  public ngOnInit(): void {
    this.buildForm();
    this.authService.user.filter((user) => !!user).take(1).subscribe((user) => {
      this.router.navigate(['/']);
    });
  }

  public toggleForm(): void {
    this.newUser = !this.newUser;
  }

  public signInWithGoogle(): void {
    this.authService.googleLogin();
  };

  public signup(): void {
    this.authService.emailSignUp(this.userForm.value).catch((error) => {
      this.serverMessage.next(error.message);
    });
  }

  public login(): void {
    this.authService.emailLogin(this.userForm.value).catch((error) => {
      this.serverMessage.next(error.message);
    })
  }

  public resetPassword() {
    this.authService.resetPassword(this.userForm.value['email'])
      .then(() => this.passReset = true)
  }

  public buildForm(): void {
    this.userForm = this.fb.group({
      'email': ['', [
        Validators.required,
        Validators.email
      ]],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25)
      ]],
    });
    this.userForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // reset validation messages
  }

  public onValueChanged(data?: any) {
    this.serverMessage.next(null);
    if (!this.userForm) {
      return;
    }
    const form = this.userForm;
    Object.keys(this.formErrors).forEach((field) => {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        Object.keys(control.errors).forEach((key) => {
          this.formErrors[field] += messages[key] + ' ';
        });
      }
    });
  }
}
