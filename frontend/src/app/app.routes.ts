import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    title: 'Home | Memory Game',
    loadComponent: () =>
      import('./features/home/pages/home')
        .then((m) => m.HomeComponent),
  },
  {
    path: 'register',
    title: 'Register | Memory Game',
    loadComponent: () =>
      import('./features/auth/pages/register/register')
        .then((m) => m.RegisterComponent),
  },
  {
    path: 'login',
    title: 'Login | Memory Game',
    loadComponent: () =>
      import('./features/auth/pages/login/login')
        .then((m) => m.LoginComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
