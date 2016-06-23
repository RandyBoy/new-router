import { Component } from '@angular/core';
import { Router, ROUTER_DIRECTIVES } from '@angular/router';
import { CORE_DIRECTIVES } from '@angular/common';
import { FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {AuthService} from './auth.service';
import { Observable } from 'rxjs/observable';
import { AsyncValidatorFn } from '@angular/forms/src/directives/validators';

@Component({
    selector: 'login',
    // providers: [AuthService],
    directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
    templateUrl: `/app/authentication/login.html`,
    providers: [FormBuilder]
})
export class Login {
    loginForm: FormGroup;
    defaultPage: string = '/crisis-center';
    targetPage: string = null;
    constructor(private router: Router, private authService: AuthService, private builder: FormBuilder) {
        this.loginForm = builder.group({
            login: ["", Validators.required],
            passwordRetry: builder.group({
                password: ["", Validators.required],
                passwordConfirmation: ["", Validators.required]
            })
        });
        

        //验证
        // builder.group({
        //     name: ['', Validators.required],
        //     email: ['', Validators.required],
        //     matchingPassword: builder.group({
        //         password: ['', Validators.required],
        //         confirmPassword: ['', Validators.required]
        //     }, { validator: this.areEqual })
        // });


        this.router.routerState
            .queryParams
            .map(p => p['targetpage']).subscribe(url => {
                if (url) this.targetPage = url;
            });
    }

    // areEqual(group: FormGroup) {
    //     var valid = false;

    //     for (name in group.controls) {
    //         var val = group.controls[name].value

    //     }

    //     if (valid) {
    //         return null;
    //     }

    //     return {
    //         areEqual: true
    //     };
    // }

    login(event: any, username: any, password: any): Observable<boolean> | boolean {
        // event.preventDefault();
        this.authService
            .login(username, password)
            .subscribe(() => {
                this.router
                    .navigateByUrl(this.targetPage ? this.targetPage : this.defaultPage);
                return true;
            });
        return false;
    }

    signup(event: Event) {
        //  event.preventDefault();
        this.router.navigateByUrl('/signup');
    }
    get value(): string {
        return JSON.stringify(this.loginForm.value, null, 2);
    }
}
