import { Component } from '@angular/core';
import { FORM_DIRECTIVES } from '@angular/forms';
import { CORE_DIRECTIVES } from '@angular/common';
import { Router } from '@angular/router';
@Component({
    moduleId: module.id,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    precompile: [],
    selector: 'test',
    templateUrl: `./dynamic-component.html`
})
export class DynamicComponent {
    constructor(private router: Router) { }
    signup(username: string, password: string, avatar: string): void {
        console.log('signup');
    }

    login(event: any) {
        this.router.navigateByUrl('/login');

    }
}