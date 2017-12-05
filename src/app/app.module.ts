import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { FooterComponent } from './footer/footer.component';
import { NavigationComponent } from './navigation/navigation.component';
import { SharedModule } from './shared/shared.module';

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
    FooterComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,

    SharedModule,
    AppRoutingModule
  ],
  providers: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
