import { RouterConfig }          from '@angular/router';
import { AuthGuard }          from './auth.guard';
import { AuthService }        from './auth.service';
import { Login }     from './login';
import { Signup } from './signup';

const someone = {
    provide: 'some-token', useValue: () => Promise.resolve({ someone: 'resovle data' })
};

export const LoginRoutes: RouterConfig = [
    { path: 'login', component: Login, data: { one: 'one' }, resolve: { resdata: 'some-token' } }, // resolve: { resolvedata: '路由传递解决数据' } 
    { path: 'login', component: Login, outlet: 'aux' },
    { path: 'signup', component: Signup }
];
export const AUTH_PROVIDERS = [AuthGuard, AuthService, someone];