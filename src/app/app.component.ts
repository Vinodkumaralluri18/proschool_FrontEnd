import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(
    private router: Router, 
  ) {
   }

  title = 'proschool-new';
  user: User;

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    // function storageChange(event) {
    //   if (event.key === "logged_in" && event.newValue != null) {
    //     return this.router.navigate(['/login']); // If you are using router
    //   }
    // } 
    // window.addEventListener('storage', storageChange, false)
    window.addEventListener('storage', (event) => {
      if (event.storageArea == localStorage) {
        let token = localStorage.getItem('currentUser');
        if(token == null || token == undefined) { // you can update this as per your key
          return this.navigate()
        }
      }
    }, false);
    // if(localStorage.getItem('currentUser')) {
    //   if(this.user.role === 'admin') {
    //     this.router.navigate(['/main/main']);
    //   } else if(this.user.role === 'teacher') {
    //     this.router.navigate(['/main/main/dashboard/teacherdashboard'])
    //   } else if(this.user.role === 'parent') {
    //     this.router.navigate(['/main/main/dashboard/parentdashboard'])
    //   } else {
    //     this.router.navigate(['/login']);
    //   }
    //   console.log(JSON.parse(localStorage.getItem('currentUser')))
    // }
  }
    
  navigate() {
    window.location.reload()
    this.router.navigate(['/']); // If you are using router
  }
}
