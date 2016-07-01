import { RouterConfig }          from '@angular/router';
import { TabsSampleApp } from './TabsSampleApp';

export const TabsRoutes: RouterConfig = [
    {
        path: 'tabs',
        component: TabsSampleApp,
        data: { control: 'tabs' },
        resolve: { resdata: 'some-token' }
    },
];
