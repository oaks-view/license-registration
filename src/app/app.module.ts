import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
// import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule } from '@angular/router';
import { WelcomeComponent } from './welcome/welcome.component';
import { FormsModule } from '@angular/forms';
import { LicenseRegistrationComponent } from './licenseRegistration/registration/licenseRegistration.component';
import { SubmittedApplicationsComponent } from './licenseReviewer/submittedApplications/submittedApplications.component';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { environment } from './../environments/environment';
import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LicenseRegistrationComponent,
    SubmittedApplicationsComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    // AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'license-registration', component: LicenseRegistrationComponent
      },
      { path: 'welcome', component: WelcomeComponent },
      { path: 'submitted-applications', component: SubmittedApplicationsComponent }
    ]),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
