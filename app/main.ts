import {bootstrap}    from '@angular/platform-browser-dynamic';
import {AppComponent} from './app.component';
import { routes} from './app.routes';
import { APP_BASE_HREF, LocationStrategy, PathLocationStrategy  } from '@angular/common';
import { provide } from '@angular/core';
import { provideRouter } from '@angular/router';

bootstrap(AppComponent, [
    provideRouter(routes),
    // { provide: LocationStrategy, useClass: PathLocationStrategy },
    provide(LocationStrategy, { useClass: PathLocationStrategy }),
    //  { provide: APP_BASE_HREF, useValue: '/' },
    provide(APP_BASE_HREF, { useValue: '.' })
])
    .catch(err => console.error(err));
