import { AuthGuard } from './auth.guard';
import { AuthService } from './auth/auth.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularFireAuthModule } from 'angularfire2/auth';

@NgModule({
  imports: [
    CommonModule,
    AngularFireAuthModule,
  ],
  declarations: [],
  providers: [
    AuthService,
    AuthGuard
  ]
})
export class CoreModule { }
