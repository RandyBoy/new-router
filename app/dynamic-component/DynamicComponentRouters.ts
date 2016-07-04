import { RouterConfig }          from '@angular/router';
import { DynamicComponentCenter } from './dynamic-component-center';
import { DynamicHTMLOutletApp } from './DynamicHTMLOutletApp';

export const DynamicComponentRoutes: RouterConfig = [
    {
        path: '',
        redirectTo: 'dynamiccomponentcenter',
        pathMatch: 'full'
    },
    {
        path: 'dynamiccomponentcenter',
        component: DynamicComponentCenter,
        children: [
            { path: '', redirectTo: 'dynamic-html-outlet-app', pathMatch: 'full' },
            { path: 'dynamic-html-outlet-app', component: DynamicHTMLOutletApp }
        ]
    }
];