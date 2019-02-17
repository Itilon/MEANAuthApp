import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken: any;
  user: any;

  constructor(private http: HttpClient, private jwtHelperService: JwtHelperService) { }

  registerUser(user: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/users/register', user, { headers: headers });
  }

  authenticateUser(user: any) {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    return this.http.post<any>('http://localhost:3000/users/authenticate', user, { headers: headers });
  }

  getProfile() {
    let headers = new HttpHeaders();
    this._loadToken();
    headers = headers
      .set('Content-Type', 'application/json')
      .set('Authorization', this.authToken);
    return this.http.get<any>('http://localhost:3000/users/profile', { headers: headers });
  }

  storeUserData(token: any, user: any) {
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loggedIn() {
    return this.jwtHelperService.isTokenExpired();
  }

  logout() {
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  _loadToken() {
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }
}
