import { RouterConfig }          from '@angular/router';
import { ChangeDetectCenter } from './ChangeDetect.Center';
import { ChangeDetectApp } from './ChangeDetect';

export const ChangeDetectorRoutes: RouterConfig = [
    {
        path: '',
        redirectTo: 'changedetectcenter',
        pathMatch: 'full'
    },
    {
        path: 'changedetectcenter',
        component: ChangeDetectCenter,
        children: [
            { path: '', redirectTo: 'changedetectapp', pathMatch: 'full' },
            { path: 'changedetectapp', component: ChangeDetectApp }
        ]
    }
];