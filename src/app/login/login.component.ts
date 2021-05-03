import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceService } from '../_services/authentication-service.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginCredentials: boolean;
  emailPattern = "[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$"

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationServiceService,
    private alertService: AlertService) { }

  loginForm: FormGroup = this.fb.group({
    // email: ['', [Validators.required, Validators.pattern(this.emailPattern)]],
    email: ['', [Validators.required]],
    password: ['', Validators.required],
  });
  wrongUserNameOrPassword = false;
  loading = false;
  returnUrl: string;

  ngOnInit() {
  }

  isRememberMe: boolean = true;
  is_email_valid: boolean = true;
  is_password_valid: boolean = true;
  is_login_valid: boolean;

  login() {
    if (this.loginForm.valid) {
      this.freshLogin()
      this.authenticationService.login(this.loginForm.value)
        .subscribe(
          data => {
            if (data.token) {
              this.loading = false;
              if (data.role === 'admin') {
                this.router.navigate(['/main/main']);
              } else if (data.role === 'teacher') {
                this.router.navigate(['/main/main/dashboard/teacherdashboard'])
              } else if (data.role === 'parent') {
                this.router.navigate(['/main/main/dashboard/parentdashboard'])
              }
            } else {
              this.router.navigate(['/']);
            }
          },
          (err) => {
            this.wrongUserNameOrPassword = true;
          }
        )
    } else {
      // show login errors 
      this.showValidationMsg(this.loginForm);
      return false;
    }
  }

  freshLogin() {
    this.loading = true;
    this.wrongUserNameOrPassword = false;
  }
  showValidationMsg(formGroup: FormGroup) {
    for (const key in formGroup.controls) {
      if (formGroup.controls.hasOwnProperty(key)) {
        const control: FormControl = <FormControl>formGroup.controls[key];
        if (Object.keys(control).includes("controls")) {
          const formGroupChild: FormGroup = <FormGroup>formGroup.controls[key];
          this.showValidationMsg(formGroupChild);
        }
        control.markAsTouched();
      }
    }
  }
  
  RegistrationPage() {
    this.router.navigate(['/registration'])
  }

  // logout() {
  // 	this.authenticationService.logout();
  // }

}