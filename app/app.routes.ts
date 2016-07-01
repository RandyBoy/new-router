import { provideRouter, RouterConfig  } from '@angular/router';
import { CrisisListComponent }  from './crisis-list.component';
import { NotFoundComponent } from './not-found';
import { CrisisAdminComponent } from './crisis-center/crisis-admin.component';
import { HeroesRoutes, HERO_PROVIDERS } from './heros/heroes.routes';
import { CrisisCenterRoutes } from './crisis-center/crisis-center.routes';
import { CanDeactivateGuard } from './interfaces';
import { LoginRoutes, AUTH_PROVIDERS } from './authentication/login.routes';
import {JqueryRoutes  } from './jquery/jquery.routes';
import { TabsRoutes } from './tabcontrol/tabs.routers';
import { WhiteListRoutes } from './whitelists/whitelist.routers';

export const routes: RouterConfig = [
    ...CrisisCenterRoutes,
    ...LoginRoutes,
    ...HeroesRoutes,
    ...JqueryRoutes,
    ...TabsRoutes,
    ...WhiteListRoutes,
    { path: '**', component: NotFoundComponent }
];


export const APP_ROUTER_PROVIDERS = [
    provideRouter(routes),
    HERO_PROVIDERS,
    CanDeactivateGuard,
    AUTH_PROVIDERS
];



