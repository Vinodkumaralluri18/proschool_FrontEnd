import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
// import { CountdownTimerModule } from 'angular-countdown-timer';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDatepickerModule, MatInputModule, MatNativeDateModule } from '@angular/material';
import { AlertComponent } from './_alert/alert/alert.component';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { RegistrationComponent } from './registration/registration.component';
import { EventlistsComponent } from './_alert/events/events.component';
import { VirtualboardComponent } from './virtualboard/virtualboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProSchoolCommonModule } from './common/common.module';
import { JwtInterceptor } from './_interceptors/auth.interceptors';
import { IsSignedInGuard } from './_guards/isLoggedIn.gaurd';
import { AuthguardGuard } from './_guards/authguard.guard';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AlertComponent,
    AccessDeniedComponent,
    RegistrationComponent,
    EventlistsComponent,
    VirtualboardComponent,
    ForgotPasswordComponent,
    LandingPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    MatDatepickerModule, MatInputModule, MatNativeDateModule,
    ReactiveFormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    // CountdownTimerModule.forRoot(),
    ProSchoolCommonModule,
  ],
  exports: [
  ],
  entryComponents: [AlertComponent, EventlistsComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    IsSignedInGuard,
    AuthguardGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
