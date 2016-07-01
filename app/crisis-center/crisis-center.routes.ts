import { RouterConfig }          from '@angular/router';
import { CrisisDetailComponent } from './crisis-detail.component';
import { CrisisListComponent }   from './crisis-list.component';
import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisAdminComponent }  from './crisis-admin.component';

import { CanDeactivateGuard }    from '../interfaces';
import { AuthGuard }             from '../authentication/auth.guard';
import { NotFoundComponent } from '../not-found';

export const CrisisCenterRoutes: RouterConfig = [
    {
        path: '',
        redirectTo: '/crisis-center',
        pathMatch: 'full'
        //terminal: true
    },
    {
        path: 'crisis-center',
        component: CrisisCenterComponent,
        resolve: { resdata: 'some-token' },
        data: { one: 'one' },
        children: [
            {
                path: '',
                component: CrisisListComponent,
                pathMatch: 'full'
            },
            {
                path: 'admin',
                component: CrisisAdminComponent,
                canActivate: [AuthGuard],
                outlet: 'aux',
                resolve: { resdata: 'some-token' }
            },
            {
                path: 'admin',
                component: CrisisAdminComponent,
                canActivate: [AuthGuard],
                data: { two: 'two' },
                resolve: { resdata: 'some-token' }
            },
            {
                path: 'notfound',
                component: NotFoundComponent,
                outlet: 'aux'
            },
            {
                path: 'notfound',
                component: NotFoundComponent
            },
            {
                path: ':id',
                component: CrisisDetailComponent,
                canDeactivate: [CanDeactivateGuard],
                outlet: 'aux'
            },
            {
                path: ':id',
                component: CrisisDetailComponent,
                canDeactivate: [CanDeactivateGuard]
            }
        ]
    }
];