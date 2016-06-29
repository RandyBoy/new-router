import {Component, OnInit} from '@angular/core';
import { AsyncPipe, COMMON_DIRECTIVES} from '@angular/common';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import {Observable} from 'rxjs/observable';
import { Hero, HeroService }   from './heros/hero.service';
import { DialogService }  from './dialog.service';
import { AuthService } from './authentication/auth.service';
import {JwtHelper} from 'angular2-jwt';
import {CollapseDirective} from 'ng2-bootstrap';
import {dom} from './utils/dom-service';

declare var System;

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES, COMMON_DIRECTIVES, CollapseDirective],
  providers: [HeroService, DialogService]
})
export class AppComponent implements OnInit {
  /**
   * [queryParams]="{name: 'cirsis-center',token:'jwttoken'}" fragment="ccfragment"
   * [queryParams] = " { name :'Heroes',token:'angular2-jwt-token'}
   */

  name: Observable<string>;
  token: Observable<string>;
  fragment: Observable<string>;

  public isCollapsed: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtHelper: JwtHelper) {
    this.name = this.router.routerState.queryParams.map(p => p['name']);
    this.token = this.router.routerState.queryParams.map(p => p['token']);
    this.fragment = this.router.routerState.fragment;

  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  login() {
    this.router.navigateByUrl('/login');
  }
  get jwt() {
    return this.authService.jwt;
  }
  get decodedJwt() {
    return this.authService.decodedJwt;
  }
  get curUser() {
    return this.authService.getCurrentUser();
  }
  get isLogined() {
    return this.authService.isLoggedIn;
  }

  ngOnInit() {
    //  System.import('app/g').then((dom) => {
    console.log(dom);
    console.log(dom.querySelector(document, '#redirect'));
    // });

    System.import('crypto-js')
      .then((crypto) => {
        console.log(crypto.HmacSHA1("Messageaaa", "Secret Passphrase"));
        let hash = crypto.HmacSHA1("Message", "Secret Passphrase")
          .toString(crypto.enc.Base64);
        console.log(hash);
        console.log(crypto.MD5('Messagesaaa').toString(crypto.enc.Hex));
      })
      .catch((err) => {
        console.error(err);
      });
    // let hash = CryptoJS.HmacSHA1("Message", "Secret Passphrase").toString(CryptoJS.enc.Base64);
    // console.log(hash);
  }
}