import { HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { AuthApiService } from '../data-access/auth-api.service';
import type { AuthUser } from '../models/auth-user.model';
import type { LoginRequest } from '../models/login.model';

export type AuthStatus =
  | 'checking'
  | 'authenticated'
  | 'anonymous'
  | 'error';

@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private readonly authApi = inject(AuthApiService);

  private readonly userState = signal<AuthUser | null>(null);
  private readonly statusState = signal<AuthStatus>('checking');

  readonly user = this.userState.asReadonly();
  readonly status = this.statusState.asReadonly();

  // to prevent an old /me response from overwriting a more recent login or logout.
  private stateVersion = 0;

  refresh(): void {
    const version = ++this.stateVersion;

    this.authApi.getCurrentUser().subscribe({
      next: (user) => {
        if (version !== this.stateVersion) {
          return;
        }

        this.userState.set(user);
        this.statusState.set('authenticated');
      },
      error: (error: unknown) => {
        if (version !== this.stateVersion) {
          return;
        }

        this.userState.set(null);

        if (
          error instanceof HttpErrorResponse &&
          error.status === 401
        ) {
          this.statusState.set('anonymous');
        } else {
          this.statusState.set('error');
        }
      },
    });
  }

  login(data: LoginRequest): Observable<AuthUser> {
    return this.authApi.login(data).pipe(
      tap((user) => {
        this.stateVersion++;
        this.userState.set(user);
        this.statusState.set('authenticated');
      }),
    );
  }

  logout(): Observable<void> {
    return this.authApi.logout().pipe(
      tap(() => {
        this.stateVersion++;
        this.userState.set(null);
        this.statusState.set('anonymous');
      }),
    );
  }
}
