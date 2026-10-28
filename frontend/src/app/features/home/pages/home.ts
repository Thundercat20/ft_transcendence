import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';

import { AuthStateService } from '../../auth/services/auth-state.service';

@Component({
  selector: 'app-home',
  imports: [RouterLink],
  template: `
    <main>
      <h1>Memory Game</h1>

      @if (auth.user(); as user) {
        <p>Welcome back, {{ user.username }}!</p>
        <p>You are logged in.</p>
      } @else if (auth.status() === 'checking') {
        <p>Checking your session...</p>
      } @else {
        <p>Welcome to our Memory Game!</p>
        <a routerLink="/login">Log in to get started</a>
      }
    </main>
  `,
})
export class HomeComponent {
  readonly auth = inject(AuthStateService);
}
