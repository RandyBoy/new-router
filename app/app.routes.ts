import { provideRouter, RouterConfig } from '@angular/router';
import { CrisisListComponent }  from './crisis-list.component';
import { NotFoundComponent } from './not-found';
import { CrisisAdminComponent } from './crisis-center/crisis-admin.component';
import { HeroesRoutes, HERO_PROVIDERS } from './heros/heroes.routes';
import { CrisisCenterRoutes } from './crisis-center/crisis-center.routes';
import { CanDeactivateGuard } from './interfaces';
import { LoginRoutes, AUTH_PROVIDERS } from './authentication/login.routes';

export const routes: RouterConfig = [
    ...CrisisCenterRoutes,
    // { path: 'crisis-center', component: CrisisListComponent, canActivate: [AuthGuard] },
    // { path: 'heroes', component: HeroListComponent, canActivate: [AllowActivate] },
    { path: 'redirectTo', redirectTo: 'heroes' },
    { path: 'notfound', component: NotFoundComponent },
    // { path: 'login', component: LoginComponent },
    ...LoginRoutes,
    // { path: 'admin', component: CrisisAdminComponent, canActivate: [AuthGuard] },
    ...HeroesRoutes,
    // { path: '', component: CrisisListComponent, canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent }
];

export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    HERO_PROVIDERS,
    CanDeactivateGuard,
    AUTH_PROVIDERS
];



