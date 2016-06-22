import { RouterConfig }          from '@angular/router';
import { CrisisDetailComponent } from './crisis-detail.component';
import { CrisisListComponent }   from './crisis-list.component';
import { CrisisCenterComponent } from './crisis-center.component';
import { CrisisAdminComponent }  from './crisis-admin.component';

import { CanDeactivateGuard }    from '../interfaces';
import { AuthGuard }             from '../authentication/auth.guard';

export const CrisisCenterRoutes: RouterConfig = [
    {
        path: '',
        redirectTo: '/crisis-center',
        terminal: true
    },
    {
        path: 'crisis-center',
        component: CrisisCenterComponent,
        children: [
            {
                path: 'admin',
                component: CrisisAdminComponent,
                canActivate: [AuthGuard]
            },
            {
                path: ':id',
                component: CrisisDetailComponent,
                canDeactivate: [CanDeactivateGuard]
            },
            {
                path: '',
                component: CrisisListComponent
            }
        ]
    }
];