import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import { routes, APP_ROUTER_PROVIDERS} from './app.routes';
import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy  } from '@angular/common';
import { provide } from '@angular/core';
import { provideRouter } from '@angular/router';
import { AllowActivate, AllowDeactivate, AuthGuard } from './hero.guard';
import { AuthService } from './auth.service';

bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS,
    // provideRouter(routes),
    // { provide: LocationStrategy, useClass: PathLocationStrategy },
    provide(LocationStrategy, { useClass: PathLocationStrategy }),
    { provide: APP_BASE_HREF, useValue: '/' },
    // AllowActivate,
    // AllowDeactivate,
    // AuthGuard,
    // AuthService,
    //provide(APP_BASE_HREF, { useValue: '.' })
]).catch(err => console.error(err));

//{provide: 'alwaysTrue', useValue: (a:ActivatedRouteSnapshot, s:RouterStateSnapshot) => true}

// class AlwaysTrue implements CanActivate {
//           canActivate(route:ActivatedRouteSnapshot, state:RouterStateSnapshot):boolean {
//             return true;
//           }
//         }

//  {provide: 'CanActivate', useValue: (a:ActivatedRouteSnapshot, b:RouterStateSnapshot) => {
//             return of(false);
//           }}

// {provide: 'CanDeactivate', useValue: (c:TeamCmp, a:ActivatedRouteSnapshot, b:RouterStateSnapshot) => {
//           return of(false);
//         }}

// {
//     provide: 'CanDeactivateParent', useValue: (c: any, a: ActivatedRouteSnapshot, b: RouterStateSnapshot) => {
//         return a.params['id'] === "22";
//     }
// },
// {
//     provide: 'CanDeactivateTeam', useValue: (c: any, a: ActivatedRouteSnapshot, b: RouterStateSnapshot) => {
//         return c.route.snapshot.params['id'] === "22";
//     }
// },
// {
//     provide: 'CanDeactivateUser', useValue: (c: any, a: ActivatedRouteSnapshot, b: RouterStateSnapshot) => {
//         return a.params['name'] === 'victor';
//     }
// }