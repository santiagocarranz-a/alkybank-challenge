import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { environment } from '@env/environment';
import { UserRegister, UserAuth } from '../model/interfaces';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private baseUrl = environment.apiBase;
  currentUserSubject: BehaviorSubject<any>;

  constructor(private http: HttpClient, private local: LocalStorageService) {
    this.currentUserSubject = new BehaviorSubject<any>(
      JSON.parse(localStorage.getItem('user') || '{}')
    )
  }

  login(user: UserAuth): Observable<UserAuth> {
    return this.http.post<UserAuth>(`${this.baseUrl}/auth/login`, user)
      .pipe(tap(user => {
        if (user) {
          localStorage.setItem('user', JSON.stringify(user));
        }
        return user;
      }))
  }

  get userAuth() {
    return this.currentUserSubject.value;
  }

  loggedIn() {
    this.local.getToken()
  }

  logout() {
    this.local.removeToken()
  }

  registro(user: UserRegister) {
    const url = `${this.baseUrl}/users`;
    return this.http.post(url, user);
  }
}
