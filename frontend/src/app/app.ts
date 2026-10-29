import {
  afterNextRender,
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  Router,
  RouterLink,
  RouterOutlet,
} from '@angular/router';
import { finalize } from 'rxjs';

import { AuthStateService } from './features/auth/services/auth-state.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  readonly auth = inject(AuthStateService);

  private readonly router = inject(Router);
  private readonly destroyRef = inject(DestroyRef);

  readonly isLoggingOut = signal(false);
  readonly logoutError = signal<string | null>(null);

  constructor() {
    afterNextRender(() => {
      this.auth.refresh();
    });
  }

  onLogout(): void {
    if (this.isLoggingOut()) {
      return;
    }

    this.isLoggingOut.set(true);
    this.logoutError.set(null);

    this.auth
      .logout()
      .pipe(
        finalize(() => this.isLoggingOut.set(false)),
        takeUntilDestroyed(this.destroyRef),
      )
      .subscribe({
        next: () => {
          void this.router.navigateByUrl('/login');
        },
        error: () => {
          this.logoutError.set(
            'Could not log out. Please try again.',
          );
        },
      });
  }
}
