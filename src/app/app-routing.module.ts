import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// import { LandingPageComponent } from './landing-page/landing-page.component';
import { LoginComponent } from './login/login.component';
import { RegistrationComponent } from './registration/registration.component';
import { MainComponent } from './main/main.component';
import { AuthguardGuard } from './_guards/authguard.guard';
import { AccessDeniedComponent } from './access-denied/access-denied.component';
import { VirtualboardComponent } from './virtualboard/virtualboard.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegistrationComponent},
  {path:'academics',loadChildren:'./academics/academics.module#AcademicsModule'},
  {path:'main',loadChildren:'./main/main.module#MainModule'},
  {path:'accessdenied',component:AccessDeniedComponent},
  {path:'virtualClass',component:VirtualboardComponent},
  {path:'forgot',component:ForgotPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
