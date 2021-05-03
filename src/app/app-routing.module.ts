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
import { UserRole } from './_models/user';
import { IsSignedInGuard } from './_guards/isLoggedIn.gaurd';

const routes: Routes = [
  {path:'',redirectTo:'login',pathMatch:'full'},
  {path:'login',component:LoginComponent, canActivate: [IsSignedInGuard]},
  {path:'registration',component:RegistrationComponent, canActivate: [IsSignedInGuard]},
  {
    path:'academics',loadChildren:'./academics/academics.module#AcademicsModule',
    canLoad: [AuthguardGuard],
    data: {
      roles: [UserRole.ADMIN, UserRole.PARENT, UserRole.EMPLOYEE ]
    }
  },
  {
    path:'main',loadChildren:'./main/main.module#MainModule',
    canLoad: [AuthguardGuard],
    data: {
      roles: [UserRole.ADMIN, UserRole.PARENT, UserRole.EMPLOYEE ]
    }
  },
  {path:'accessdenied',component:AccessDeniedComponent},
  {path:'virtualClass',component:VirtualboardComponent},
  {path:'forgot',component:ForgotPasswordComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: false })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
