import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceService } from '../_services/authentication-service.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { AlertComponent } from '../_alert/alert/alert.component';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    public dialog: MatDialog,
    private authenticationService: AuthenticationServiceService) { }

  loginForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
  });

  otpForm: FormGroup = this.fb.group({
    otp: ['', Validators.required],
  });

  passwordForm: FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required],
  });

  alert_message: string;
  loading = false;
  returnUrl: string;

  ngOnInit() {
  }

  username_value: boolean = true;
  otp_value: boolean = false;
  password_value: boolean = false;

  is_email_valid: boolean = true;
  is_otp_valid: boolean = true;
  is_password_valid: boolean = true;
  is_login_valid: boolean = true;

  get email(): any {
    return this.loginForm.get('email');
  }

  get otp(): any {
    return this.otpForm.get('otp');
  }

  get password(): any {
    return this.passwordForm.get('password');
  }

  verifyEmailId() {
    // var re = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    // this.is_email_valid = re.test(this.email.value);
    this.is_email_valid = this.email.value === '' ? false : true;
    return this.is_email_valid;
  }

  verifyOTP() {
    this.is_otp_valid = this.otp.value === '' ? false : true;
    return this.is_otp_valid;
  }

  verifyPassword() {
    this.is_password_valid = this.password.value === '' ? false : true;
    return this.is_password_valid;
  }

  forgot_password() {
    this.verifyEmailId();
    if (this.is_email_valid) { 
      this.loading = true;
      this.authenticationService.forgot_password(this.loginForm.value)
      .subscribe(
        data => {
          if(data === true) {
            this.username_value = false;
            this.otp_value = true;
            this.alert_message = "OTP has sent to the registered email Id";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "No account with the Username exists";
            this.openAlert(this.alert_message)
          }
        }
      )
    } else {
      return false;
    }
  }

  verify_otp() {
    this.verifyOTP();
    if (this.is_otp_valid) { 
      this.loading = true;
      this.authenticationService.verify_otp(this.otpForm.value)
      .subscribe(
        data => {
          if(data.status === true) {
            this.otp_value = false;
            this.password_value = true;
            this.alert_message = "OTP Verified Successfully";
            this.openAlert(this.alert_message)
          } else {
            this.alert_message = "Invalid OTP Entered";
            this.openAlert(this.alert_message)
          }
        }
      )
    } else {
      return false;
    }
  }

  reset_password() {
    this.verifyPassword();
    if (this.is_otp_valid && this.is_password_valid) { 
      this.loading = true;
      this.passwordForm.value.email = this.loginForm.value.email;
      this.authenticationService.reset_password(this.passwordForm.value)
      .subscribe(
        data => {
          if(data.status === true) {
            this.alert_message = "Password Changed Successfully";
            this.openAlert(this.alert_message)
            this.router.navigate(['/login']);
          } else {
            this.alert_message = "Unable to change the Password";
            this.openAlert(this.alert_message)
          }
        }
      )
    } else {
      return false;
    }
  }

  openAlert(alert_message) {
    const alertConfig = new MatDialogConfig();

    alertConfig.autoFocus = true;
    alertConfig.width = '40%';

    alertConfig.data = {
      message: alert_message,
    };

    const alertRef = this.dialog.open(AlertComponent, alertConfig);

    alertRef.afterClosed().subscribe()
  }

}
