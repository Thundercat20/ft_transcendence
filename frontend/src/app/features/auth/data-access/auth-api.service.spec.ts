import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import {
  afterEach,
  beforeEach,
  describe,
  expect,
  it,
} from 'vitest';

import { AuthApiService } from './auth-api.service';

describe('AuthApiService', () => {
  let service: AuthApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });

    service = TestBed.inject(AuthApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should send a registration POST request', () => {
    const input = {
      username: 'player42',
      email: 'player@example.com',
      password: 'ExamplePassword2026!',
    };

    const response = {
      id: 'test-user-id',
      username: 'player42',
      email: 'player@example.com',
      createdAt: '2026-10-27T12:00:00.000Z',
    };

    service.register(input).subscribe((user) => {
      expect(user).toEqual(response);
    });

    const request = httpMock.expectOne(
      '/api/auth/register',
    );

    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual(input);

    request.flush(response);
  });
});
