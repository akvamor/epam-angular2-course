import { Router } from '@angular/router';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { AuthService } from './../../core/auth/auth.service';

@Component({
  selector: 'epam-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthorizationComponent implements OnInit {

  userForm: FormGroup;
  newUser = false;
  passReset = false;
  formErrors = {
    'email': '',
    'password': ''
  };
  validationMessages = {
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
  serverMessage = new BehaviorSubject<string>(null);
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.buildForm();
    this.authService.user.filter((user) => !!user).take(1).subscribe((user) => {
      this.router.navigate(['/']);
    });
  }

  toggleForm(): void {
    this.newUser = !this.newUser;
  }

  signInWithGoogle(): void {
    this.authService.googleLogin();
  };

  signup(): void {
    this.authService.emailSignUp(this.userForm.value).catch((error) => {
      this.serverMessage.next(error.message);
    });
  }

  login(): void {
    this.authService.emailLogin(this.userForm.value).catch((error) => {
      this.serverMessage.next(error.message);
    })
  }

  resetPassword() {
    this.authService.resetPassword(this.userForm.value['email'])
      .then(() => this.passReset = true)
  }

  buildForm(): void {
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

  onValueChanged(data?: any) {
    this.serverMessage.next(null);
    if (!this.userForm) { return; }
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
