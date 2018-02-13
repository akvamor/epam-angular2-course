import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import {
  StoreRouterConnectingModule,
  RouterStateSerializer,
} from '@ngrx/router-store';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { rootReducers, metaReducers } from './app.reducer.module';
import { environment } from './../environments/environment';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app.routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SharedModule } from './shared/shared.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { CoreModule } from './core/core.module';
import { CustomRouterStateSerializer } from '@app/shared/custom-router-state-serializer';

// Initialize Firebase
export const firebaseConfig = {
  apiKey: 'AIzaSyAqPRGjctXDmtR0OHFDelWGoI39J1XLz6A',
  authDomain: 'epam-courses.firebaseapp.com',
  databaseURL: 'https://epam-courses.firebaseio.com',
  projectId: 'epam-courses',
  storageBucket: 'epam-courses.appspot.com',
  messagingSenderId: '804491417296'
};

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    FooterComponent,
    UserProfileComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    CoreModule,

    SharedModule,
    AppRoutingModule,

    StoreModule.forRoot(rootReducers, { metaReducers }),
    StoreRouterConnectingModule,
    EffectsModule.forRoot([]),
    !environment.production ? StoreDevtoolsModule.instrument({maxAge: 15}) : [],
  ],
  providers: [
    { provide: RouterStateSerializer, useClass: CustomRouterStateSerializer },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
