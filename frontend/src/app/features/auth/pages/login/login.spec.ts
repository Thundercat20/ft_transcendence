import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LoginComponent } from './login';
import { AuthStateService } from '../../services/auth-state.service';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let httpMock: HttpTestingController;
  let authState: AuthStateService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginComponent],
      providers: [
        provideRouter([]),
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;

    httpMock = TestBed.inject(HttpTestingController);
    authState = TestBed.inject(AuthStateService);
  });

  it('should reject an empty form', () => {
    expect(component.form.invalid).toBe(true);
  });

  it('should not submit invalid data', () => {
    component.onSubmit();

    httpMock.expectNone('/api/auth/login');
  });

  it('should log in with valid credentials', () => {
    const router = TestBed.inject(Router);

    vi.spyOn(router, 'navigateByUrl')
      .mockResolvedValue(true);

    component.form.setValue({
      identifier: 'player42',
      password: 'ExamplePassword2026!',
    });

    component.onSubmit();

    const request = httpMock.expectOne(
      '/api/auth/login',
    );

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({
      identifier: 'player42',
      password: 'ExamplePassword2026!',
    });

    const user = {
      id: 'test-id',
      username: 'player42',
      email: 'player@example.com',
      createdAt: '2026-10-28T12:00:00.000Z',
    };

    request.flush(user);

    expect(authState.user()).toEqual(user);
    expect(authState.status()).toBe('authenticated');

    httpMock.verify();
  });
});