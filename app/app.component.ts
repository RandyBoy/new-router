import {Component, OnInit} from '@angular/core';
import { AsyncPipe, COMMON_DIRECTIVES} from '@angular/common';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import {Observable} from 'rxjs/observable';
import { Hero, HeroService }   from './heros/hero.service';
import { DialogService }  from './dialog.service';
import { AuthService } from './authentication/auth.service';
@Component({
  selector: 'my-app',
  template: `
    <h1>Component Router</h1>
    <h3 *ngIf="currentUser" >当前用户=>{{currentUser}}</h3>
    <nav>
      <a [routerLink] = "['./crisis-center']" [queryParams]="{name: 'cirsis-center',token:'jwttoken'}" fragment="ccfragment">Crisis Center</a>
      <a [routerLink] = "['./heroes']" [queryParams] = " { name :'Heroes',token:'angular2-jwt-token'}">Heroes</a>
      <a [routerLink] = "['/crisis-center/admin']">Admin</a>
      <a [routerLink] = "['/login']">Login</a>
      <a [routerLink] = "['/signup']">Signup</a>
      <a [routerLink] = "['redirectTo']" >RedirectTo</a>
    </nav>
    <ng-container *ngIf="false">
      query: name:{{name | async}}  token:{{token | async}}  fragment: {{fragment | async}}
    </ng-container> 
    <div >
     <router-outlet></router-outlet>
    </div>
     <hr>
     <router-outlet name="header"></router-outlet> 
  `,
  directives: [ROUTER_DIRECTIVES, COMMON_DIRECTIVES],
  providers: [HeroService, DialogService, AuthService]
})
export class AppComponent implements OnInit {
  /**
   *
   */
  currentUser: any;
  name: Observable<string>;
  token: Observable<string>;
  fragment: Observable<string>;
  constructor(private router: Router, private authService: AuthService) {
    this.name = this.router.routerState.queryParams.map(p => p['name']);
    this.token = this.router.routerState.queryParams.map(p => p['token']);
    this.fragment = this.router.routerState.fragment;
    setInterval(() => {
      this.currentUser = this.authService.currentUser ? this.authService.currentUser.username : null;
    }
      , 50);

  }

  ngOnInit() {

  }
}