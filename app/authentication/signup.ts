import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CORE_DIRECTIVES } from '@angular/common';
import { FORM_DIRECTIVES  } from '@angular/forms';

import {AuthService} from './auth.service';
import { FocusDirective } from '../directives/FocusDirective';


@Component({
    moduleId:module.id,
    selector: 'signup',
    // providers: [AuthService],
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES, FocusDirective],
    templateUrl: '/app/authentication/signup.html'
})
export class Signup {

    constructor(public router: Router, private authService: AuthService) {
    
    }

    signup(event: any, username: string, password: string, avatar: string): void {
        //  event.preventDefault();
        this.authService.signup(username, password, avatar).then(() => {
            this.router.navigateByUrl('/crisis-center');
        });
    }

    login(event: any) {
        // event.preventDefault();
        this.router.navigateByUrl('/login');
    }
}
