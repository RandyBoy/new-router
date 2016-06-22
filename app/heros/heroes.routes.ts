import { RouterConfig }          from '@angular/router';
import { HeroListComponent }     from './hero-list.component';
import { HeroDetailComponent }   from './hero-detail.component';
import { AllowActivate, AllowDeactivate } from './hero.guard';

export const HeroesRoutes: RouterConfig = [
    { path: 'heroes', component: HeroListComponent, canActivate: [AllowActivate] },
    { path: 'hero/:id', component: HeroDetailComponent, canDeactivate: [AllowDeactivate] }
];

export const HERO_PROVIDERS = [AllowActivate, AllowDeactivate];