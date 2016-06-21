import {Component, OnInit} from '@angular/core';
import { AsyncPipe, COMMON_DIRECTIVES} from '@angular/common';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import {Observable} from 'rxjs/rx';

@Component({
  selector: 'my-app',
  template: `
    <h1>Component Router</h1>
    <nav>
      <a [routerLink] = "['./crisis-center']" [queryParams]="{name: 'cirsis-center',token:'jwttoken'}" fragment="ccfragment">Crisis Center</a>
      <a [routerLink] = "['./heroes']" [queryParams] = " { name :'Heroes',token:'angular2-jwt-token'}">Heroes</a>
      <a [routerLink] = "['/admin']">Admin</a>
      <a [routerLink] = "['/login']">Login</a>
      <a [routerLink] = "['./abc']">NotFound</a>
      <a [routerLink] = "['a']" >RedirectTo</a>
    </nav>
    <ng-container *ngIf="false">
      query: name:{{name | async}}  token:{{token | async}}  fragment: {{fragment | async}}
    </ng-container> 
     <router-outlet></router-outlet> 
     <hr>
     <router-outlet name="header"></router-outlet> 
  `,
  directives: [ROUTER_DIRECTIVES, COMMON_DIRECTIVES]
})
export class AppComponent implements OnInit {
  /**
   *
   */
  name: Observable<string>;
  token: Observable<string>;
  fragment: Observable<string>;
  constructor(private router: Router) {
    this.name = this.router.routerState.queryParams.map(p => p['name']);
    this.token = this.router.routerState.queryParams.map(p => p['token']);
    this.fragment = this.router.routerState.fragment;

  }

  ngOnInit() {
    // this.router.navigate(['./heroes']);
  }
}