import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  authenticationState = new BehaviorSubject(false);

  constructor() {
    this.checkToken();
  }

  checkToken() {
    const token = sessionStorage.getItem('accessToken');
    if (token) {
      return this.authenticationState.next(true);
    }
  }

  login(token: any, profile: any) {
    sessionStorage.setItem('accessToken', token);
    sessionStorage.setItem('profile', profile);
    return this.authenticationState.next(true);
  }

  logout() {
    sessionStorage.clear();
    return this.authenticationState.next(false);
  }

  isAuthenticated() {
    return this.authenticationState.value;
  }
}
