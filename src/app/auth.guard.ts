import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = (route, state) => {
    const router = inject(Router)
    const username = sessionStorage.getItem('Username') ;

    if(username) {
        return true;
    }
    else {
        router.navigate(['/login']);
        return false;
  }
}
