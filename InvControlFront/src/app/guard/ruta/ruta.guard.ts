import { inject } from '@angular/core';
import { CanActivateFn, Router, ActivatedRouteSnapshot } from '@angular/router';
import { AuthserviceService } from 'src/app/dashboard/services/authservice/authservice.service';


export const rutaGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state) => {
  const authService = inject(AuthserviceService);
  const router = inject(Router);

  if (!authService.isLoggedIn() || !authService.isUserHabilitado()) {
    return router.createUrlTree(['/auth/login']);
  }

  const expectedRole = route.data['expectedRole'];
  if (expectedRole !== undefined && authService.getUserRole() !== expectedRole) {
    // Redirigir al dashboard o una página de acceso denegado
    return router.createUrlTree(['/dashboard/home']);
  }

  return true;
};
