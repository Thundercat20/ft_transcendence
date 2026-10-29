import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import {
  RegisterRequest,
  RegisterResponse,
} from '../models/register.model';

import { AuthUser } from '../models/auth-user.model';
import { LoginRequest } from '../models/login.model';

@Injectable({
  providedIn: 'root',
})
export class AuthApiService {
  private readonly http = inject(HttpClient);

  register(data: RegisterRequest): Observable<RegisterResponse> {
    return this.http.post<RegisterResponse>(
      '/api/auth/register',
      data,
    );
  }

  login(data: LoginRequest): Observable<AuthUser> {
    return this.http.post<AuthUser>(
      '/api/auth/login',
      data,
    );
  }

  getCurrentUser(): Observable<AuthUser> {
    return this.http.get<AuthUser>(
      '/api/auth/me',
      { transferCache: false },
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(
      '/api/auth/logout',
      null,
    );
  }
}
