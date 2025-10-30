import { Injectable } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const AuthGuard: CanActivateFn = (route, state) => {
  const injector = route.injector;
  const auth = injector.get(AuthService);
  const router = injector.get(Router);
  if (!auth.currentUser) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
