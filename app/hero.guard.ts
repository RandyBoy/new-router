import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import * as Rx from 'rxjs/rx';
import { AuthService } from './auth.service';

@Injectable()
export class AllowActivate implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Rx.Observable<boolean> {
        return Rx.Observable.of(true).delay(3000);
    }
}

@Injectable()
export class AllowDeactivate implements CanDeactivate<any> {
    canDeactivate(component: any, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Rx.Observable<boolean> {
        return Rx.Observable.of(true).delay(1500);
    }
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private authService: AuthService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.isLoggedIn) { return true; }
        this.router.navigate(['/login']);
        return false;
    }
}