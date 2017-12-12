import { AuthorizationRoutingModule } from './authorization.routing.module';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorizationComponent } from './authorization/authorization.component';
import { ReactiveFormsModule } from '@angular/forms';
import { CoreModule } from '@app/core/core.module';

@NgModule({
  imports: [
    AuthorizationRoutingModule,
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    CoreModule,
  ],
  declarations: [AuthorizationComponent]
})
export class AuthorizationModule { }
