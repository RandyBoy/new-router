import { provideRouter, RouterConfig } from '@angular/router';
import { CrisisListComponent }  from './crisis-list.component';
import { HeroListComponent }    from './hero-list.component';
import { NotFoundComponent } from './not-found';
import { AllowActivate, AllowDeactivate, AuthGuard } from './hero.guard';
import { LoginComponent } from './login-component';
import { CrisisAdminComponent } from './crisis-admin.component';
import { AuthService } from './auth.service';

export const routes: RouterConfig = [

    { path: 'crisis-center', component: CrisisListComponent, canActivate: [AuthGuard] },
    { path: 'heroes', component: HeroListComponent, canActivate: [AllowActivate] },
    { path: 'a', redirectTo: 'heroes' },
    { path: 'abc', component: NotFoundComponent },
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: CrisisAdminComponent, canActivate: [AuthGuard] },
    { path: '', component: CrisisListComponent, canActivate: [AuthGuard] },
    { path: '**', component: NotFoundComponent }
];

export const APP_ROUTER_PROVIDERS = [provideRouter(routes),
    AllowActivate,
    AllowDeactivate,
    AuthGuard,
    AuthService
];



