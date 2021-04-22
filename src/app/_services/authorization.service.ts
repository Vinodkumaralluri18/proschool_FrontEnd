import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  currentUser;

  isAuthorized(allowedRoles: string[]): boolean {
    // check if the list of allowed roles is empty, if empty, authorize the user to access the page
    if (allowedRoles == null || allowedRoles.length === 0) {
      return true;
    }

    // get User from local storage or state management
    this.currentUser = localStorage.getItem('currentUser');

    // get role of the User from local storage or state management
    const role = this.currentUser.role;

    // check if it was decoded successfully, if not the token is not valid, deny access
    if (!role) {
      console.log('Invalid User');
      return false;
    }

    // check if the user roles is in the list of allowed roles, return true if allowed and false if not allowed
    return allowedRoles.includes(role);
  }

}
