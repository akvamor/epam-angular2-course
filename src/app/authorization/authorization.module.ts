import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';

import { SharedModule } from './../shared/shared.module';
import { AuthorizationRoutingModule } from './authorization.routing.module';
import { AuthorizationComponent } from './authorization/authorization.component';

@NgModule({
  imports: [
    AuthorizationRoutingModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  declarations: [
    AuthorizationComponent,
  ]
})
export class AuthorizationModule { }
