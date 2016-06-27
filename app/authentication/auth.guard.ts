import { Injectable }from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot }    from '@angular/router';
import { AuthService }from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isLoggedIn || this.authService.currentUser) { return true; }
        this.router.navigate(['/login', { targetpage: state.url }], { queryParams: {}, fragment: '' }); // { queryParams: {}, fragment: '' } relativeTo: this.router.routerState.root }
        return false;
      //  document.querySelector()
    }
}
