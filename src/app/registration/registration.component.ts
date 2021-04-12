import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationServiceService } from '../_services/authentication-service.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  constructor(private service: AuthenticationServiceService, private router: Router, private fb: FormBuilder) { }

  ngOnInit() {
  }

  rigisterForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    branches: ['', Validators.required],
    website: ['', Validators.required],
    address: ['', Validators.required]
  });

  register() {
    this.service.register(this.rigisterForm.value)
    .subscribe(
      res => { console.log(res) }
    )
  }

  loginPage() {
    this.router.navigate(['/login'])
  }
  
}
