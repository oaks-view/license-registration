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
import { SigninComponent } from '../app/accounts/signin/signin.component';
import { SignupComponent } from '../app/accounts/signup/signup.component';
import { AuthService } from './shared/services/auth.service';


@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    LicenseRegistrationComponent,
    SubmittedApplicationsComponent,
    SigninComponent,
    SignupComponent
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
      { path: 'submitted-applications', component: SubmittedApplicationsComponent },
      { path: 'signin', component: SigninComponent },
      { path: 'signup', component: SignupComponent },
      { path: '', redirectTo: '/welcome', pathMatch: 'full'},
      { path: '**', redirectTo: '/welcome' }
    ]),
    Ng4LoadingSpinnerModule.forRoot()
  ],
  providers: [
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
