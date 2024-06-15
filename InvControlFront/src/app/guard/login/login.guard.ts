import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthserviceService } from 'src/app/dashboard/services/authservice/authservice.service';

export const loginGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthserviceService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    router.navigate(['../../dashboard/home']);
    return false;
  }
  
  return true;
};