import { RouterConfig } from '@angular/router';
import { WhiteList } from './whitelist';
import {Recognition} from './recognition';
import {White} from './white';
import {Black} from './black';
import { HeroListComponent } from '../heros/hero-list.component';
import { HeroDetailComponent } from '../heros/hero-detail.component';

export const WhiteListRoutes: RouterConfig = [
    {
        path: '',
        redirectTo: '/whitelist',
        pathMatch: 'full'
    },
    {
        path: 'whitelist',
        component: WhiteList,
        children: [
            { path: '', redirectTo: 'recognition', pathMatch: 'full' },
            { path: 'recognition', component: Recognition },
            { path: 'white', component: White },
            { path: 'black', component: Black },
            {
                path: 'heroes',
                component: HeroListComponent,
                // children: [
                //     { path: '', component: HeroListComponent },
                //     { path: 'hero/:id', component: HeroDetailComponent },
                // ]
            },
            { path: 'hero/:id', component: HeroDetailComponent }
        ]
    },
];