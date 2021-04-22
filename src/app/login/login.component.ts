import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceService } from '../_services/authentication-service.service';
import { AlertService } from '../_services/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginCredentials: boolean;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private authenticationService: AuthenticationServiceService,
    private alertService: AlertService) { }

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });
  loading = false;
  returnUrl: string;

  ngOnInit() {
  }

  isRememberMe: boolean = true;
  is_email_valid: boolean = true;
  is_password_valid: boolean = true;
  is_login_valid: boolean;

  get email(): any {
    return this.loginForm.get('email');
  }

  get password(): any {
    return this.loginForm.get('password');
  }

  login() {
    this.verifyEmailId();
    this.varifyPassword();
    if (this.is_email_valid && this.is_password_valid) {
      setTimeout(() => {
        this.loading = true;
      }, 2000)
      this.authenticationService.login(this.loginForm.value)
        .subscribe(
          data => {
            if (data.token) {
              if (data.role === 'admin') {
                this.loading == false;
                this.router.navigate(['/main/main']);
              } else if (data.role === 'teacher') {
                this.loading == false;
                this.router.navigate(['/main/main/dashboard/teacherdashboard'])
              } else if (data.role === 'parent') {
                this.loading == false;
                this.router.navigate(['/main/main/dashboard/parentdashboard'])
              }
            } else {
              this.is_login_valid = true
              this.router.navigate(['/']);
            }

          }
        )
    } else {

      return false;
    }
  }

  verifyEmailId() {
    // var re = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // this.is_email_valid = re.test(this.email.value);
    this.is_email_valid = this.email.value === '' ? false : true;
    return this.is_email_valid;
  }

  varifyPassword() {
    this.is_password_valid = this.password.value === '' ? false : true;
    return this.is_password_valid
  }

  RegistrationPage() {
    this.router.navigate(['/registration'])
  }

  // logout() {
  // 	this.authenticationService.logout();
  // }

}