import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES } from '@angular/common';
import { FORM_DIRECTIVES } from '@angular/forms';
import {AuthService} from './auth.service';
import { Observable } from 'rxjs/observable';

@Component({
    selector: 'login',
    // providers: [AuthService],
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES],
    templateUrl: `/app/authentication/login.html`
})
export class Login {

    constructor(private router: Router, private authService: AuthService) {

    }

    login(event: any, username: any, password: any): Observable<boolean> | boolean {
        event.preventDefault();
        this.authService.login(username, password).subscribe(() => {
            this.router.navigateByUrl('/crisis-center');
            return true;
        });
        return false;
    }

    signup(event: Event) {
        event.preventDefault();
        this.router.navigateByUrl('/signup');
    }
}
