import { Component }            from '@angular/core';
import { ROUTER_DIRECTIVES }    from '@angular/router';
import { CrisisService }        from './crisis.service';

@Component({
  template: `
    <h2>CRISIS CENTER</h2>
    <ng-container>
    <router-outlet></router-outlet>
    <hr>
    <router-outlet name = 'aux'></router-outlet>
    </ng-container>
  `,
  directives: [ROUTER_DIRECTIVES],
  providers: [CrisisService]
})
export class CrisisCenterComponent { }