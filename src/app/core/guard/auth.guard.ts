import { CanActivateChildFn, Router } from '@angular/router';
import { inject } from '@angular/core'
import { AuthService } from '../services/auth.service';

export const authGuard: CanActivateChildFn = (childRoute, state) => {
  const router = new Router
  if (!inject(AuthService).isAuthenticated()) {
    router.navigate([''])
    return false
  }
  return true;
};
