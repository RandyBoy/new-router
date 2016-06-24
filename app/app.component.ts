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
    <h3 *ngIf="getUser()" >当前用户=>{{currentUser}}</h3>
    <nav>
      <a [routerLink] = "['/crisis-center']">Crisis Center</a>
      <a [routerLink] = "['/aux:heroes']" >Heroes</a>
      <a [routerLink] = "['/crisis-center/admin']">Admin</a>
      <a [routerLink] = "['/crisis-center/aux:admin']">Admin(aux)</a>
      <a [routerLink] = "['/login']">Login</a>
      <a [routerLink] = "['/signup']">Signup</a>
      <a [routerLink] = "['redirect']" >RedirectTo</a>
    </nav>
    <ng-container *ngIf="false">
      query: name:{{name | async}}  token:{{token | async}}  fragment: {{fragment | async}}
    </ng-container> 
    <ng-container>
     <router-outlet></router-outlet>
     <hr>
     <router-outlet name="aux"></router-outlet> 
     <hr>
     <router-outlet name="bottom"></router-outlet> 
     </ng-container> 
  `,
  directives: [ROUTER_DIRECTIVES, COMMON_DIRECTIVES],
  providers: [HeroService, DialogService]
})
export class AppComponent implements OnInit {
  /**
   * [queryParams]="{name: 'cirsis-center',token:'jwttoken'}" fragment="ccfragment"
   * [queryParams] = " { name :'Heroes',token:'angular2-jwt-token'}
   */
  currentUser: any;
  name: Observable<string>;
  token: Observable<string>;
  fragment: Observable<string>;
  constructor(private router: Router, private authService: AuthService) {
    this.name = this.router.routerState.queryParams.map(p => p['name']);
    this.token = this.router.routerState.queryParams.map(p => p['token']);
    this.fragment = this.router.routerState.fragment;

  }

  getUser() {
    let currUser = this.authService.getCurrentUser();
    if (currUser) {
      this.currentUser = currUser.username;
    }
    return currUser != null;
  }

  ngOnInit() {

  }
}