import { RouterConfig }          from '@angular/router';
import { HeroListComponent }     from './hero-list.component';
import { HeroDetailComponent }   from './hero-detail.component';
import { AllowActivate, AllowDeactivate } from './hero.guard';

export const HeroesRoutes: RouterConfig = [
    { path: 'redirect', redirectTo: '/heroes' },
    { path: 'heroes', component: HeroListComponent, canActivate: [AllowActivate] },
    { path: 'heroes', component: HeroListComponent, canActivate: [AllowActivate], outlet: 'aux' },
    { path: 'heroes', component: HeroListComponent, canActivate: [AllowActivate], outlet: 'bottom' },
    { path: 'hero/:id', component: HeroDetailComponent, canDeactivate: [AllowDeactivate] },
    { path: 'hero/:id', component: HeroDetailComponent, canDeactivate: [AllowDeactivate], outlet: 'aux' },
    { path: 'hero/:id', component: HeroDetailComponent, canDeactivate: [AllowDeactivate], outlet: 'bootom' }

];

export const HERO_PROVIDERS = [AllowActivate, AllowDeactivate];