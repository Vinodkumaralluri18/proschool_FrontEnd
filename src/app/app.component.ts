import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private router: Router) { }

  title = 'proschool-new';
  user: User;
  
  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('currentUser'));    
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
}
