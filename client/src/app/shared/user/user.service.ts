import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { User } from './user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUser: User = {
    name: '',
    surname: '',
    email: '',
    username: '',
    password: ''
  };

  noAuthHeader = {headers: new HttpHeaders({'NoAuth': 'True'})};

  constructor(private http: HttpClient) { }


  // HTTP METHODS
  postUser(user: User) {
    return this.http.post(`${environment.apiBaseUrl}/register`, user, this.noAuthHeader);
  }

  login(credentials) {
    return this.http.post(`${environment.apiBaseUrl}/auth`, credentials, this.noAuthHeader);
  }

  getUserProfile() {
    return this.http.get(`${environment.apiBaseUrl}/profile`);
  }

  getAllUsers() {
    return this.http.get(`${environment.apiBaseUrl}/userlist`);
  }

  deleteUser(username: String) {
    const deleteOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        userToDelete: username,
      },
    };

    return this.http.delete(`${environment.apiBaseUrl}/delete-user`, deleteOptions);
  }


  // AUX METHODS
  getToken() {
    return localStorage.getItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  removeToken() {
    localStorage.removeItem('token');
  }

  getUserPayload() {
    var token = this.getToken();
    if(token) 
      return JSON.parse(atob(token.split('.')[1]));
    return null;
  }

  isLoggedIn() {
    var userPayload = this.getUserPayload();
    if(userPayload)
      return userPayload.exp > Date.now() / 1000;
    return false;
  }

}
