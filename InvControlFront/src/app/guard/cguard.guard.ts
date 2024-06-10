import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const cguardGuard: CanActivateFn = (route, state) => {

    const router = inject(Router);

  const isLoggedIn = localStorage.getItem('rol');
  console.log(isLoggedIn)
  if (isLoggedIn) {
    if (isLoggedIn === '1') {
      return true;
    } else if (isLoggedIn === '2') {
      return true;
    }else if (isLoggedIn === '3') {
      return true;
    }


  }
  router.navigate(['/auth/login']);
  return false;

};
