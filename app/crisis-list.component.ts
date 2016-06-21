import { Component } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/rx';
@Component({
    template: `
    <h2>CRISIS CENTER</h2>
    <p>Get your crisis here</p>
    CRISIS CENTER: {{name | async}} {{token | async}}
    `
})
export class CrisisListComponent {

    name: Observable<string>;
    token: Observable<string>;
    recordedParams: Params[] = [];
    /**
     *
     */
    constructor(route: ActivatedRoute) {
        this.name = route.params.map(p => p['name']);
        this.token = route.params.map(p => p['token']);
        route.params.forEach(_ => this.recordedParams.push(_));
    }
}