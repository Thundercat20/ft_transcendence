import { signal } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { of } from 'rxjs';
import { beforeEach, describe, expect, it } from 'vitest';

import { App } from './app';
import { AuthStateService } from './features/auth/services/auth-state.service';

describe('App', () => {
  beforeEach(async () => {
    const authStateStub = {
      user: signal(null),
      status: signal('anonymous'),
      refresh: () => {},
      logout: () => of(undefined),
    };

    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([]),
        {
          provide: AuthStateService,
          useValue: authStateStub,
        },
      ],
    }).compileComponents();
  });

  it('should create the application', () => {
    const fixture = TestBed.createComponent(App);

    expect(fixture.componentInstance).toBeTruthy();
  });

  it('should display navigation links', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    const links = Array.from(
      compiled.querySelectorAll('nav a'),
    );

    expect(
      links.some((link) => link.textContent?.includes('Login')),
    ).toBe(true);

    expect(
      links.some((link) => link.textContent?.includes('Register')),
    ).toBe(true);
  });
});