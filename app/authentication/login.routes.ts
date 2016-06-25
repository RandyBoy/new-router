import { AuthGuard }          from './auth.guard';
import { AuthService }        from './auth.service';
import { Login }     from './login';
import { Signup } from './signup';

export const LoginRoutes = [
    { path: 'login', component: Login },
    { path: 'login', component: Login, outlet: 'aux' },
    { path: 'signup', component: Signup }
];
export const AUTH_PROVIDERS = [AuthGuard, AuthService];