import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthserviceService } from '../dashboard/services/authservice/authservice.service';

export const cguardGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthserviceService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    authService.resetInactivityTimer();
    const userRole = authService.getUserRole();
    console.log(userRole); 
    if (userRole.toString() === "1" || userRole.toString() === "2" || userRole.toString() === "3") {
      return true;
    }
    return false;
  }

  router.navigate(['/auth/login']);
  return false;
};
