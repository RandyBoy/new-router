import {Component, OnInit} from '@angular/core';
import { AsyncPipe, COMMON_DIRECTIVES} from '@angular/common';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import {Observable} from 'rxjs/observable';
import { Hero, HeroService }   from './heros/hero.service';
import { DialogService }  from './dialog.service';
import { AuthService } from './authentication/auth.service';
import {JwtHelper, AuthHttp} from 'angular2-jwt';
import {CollapseDirective} from 'ng2-bootstrap';
import {dom} from './utils/dom-service';
import { Http } from '@angular/http';


declare var System;

@Component({
  selector: 'my-app',
  templateUrl: 'app/app.component.html',
  directives: [ROUTER_DIRECTIVES, COMMON_DIRECTIVES, CollapseDirective],
  providers: [HeroService, DialogService],
  precompile: []
})
export class AppComponent implements OnInit {
  /**
   * [queryParams]="{name: 'cirsis-center',token:'jwttoken'}" fragment="ccfragment"
   * [queryParams] = " { name :'Heroes',token:'angular2-jwt-token'}
   */

  name: Observable<string>;
  token: Observable<string>;
  fragment: Observable<string>;
  response: string;
  api: string;

  public isCollapsed: boolean = false;
  constructor(
    private router: Router,
    private authService: AuthService,
    private jwtHelper: JwtHelper,
    private http: Http,
    private _authHttp: AuthHttp
  ) {
    this.name = this.router.routerState.queryParams.map(p => p['name']);
    this.token = this.router.routerState.queryParams.map(p => p['token']);
    this.fragment = this.router.routerState.fragment;
    this.logout();
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/login');
  }

  login() {
    this.logout();
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

  callAnonymousApi() {
    this._callApi('Anonymous', 'http://localhost:9000/api/messages');
  }

  callSecuredApi() {
    this._callApi('Secured', 'http://localhost:9000/api/protected/messages');
  }

  _callApi(type, url) {
    this.response = null;

    if (type === 'Anonymous') {
      // For non-protected routes, just use Http
      this.http.get(url)
        .subscribe(
        response => this.response = response.text(),
        error => this.response = error.text()
        );
    }

    if (type === 'Secured') {
      // For protected routes, use AuthHttp
      this._authHttp.get(url)
        .subscribe(
        response => this.response = response.text(),
        error => this.response = error.text()
        );
    }
  }
  ngOnInit() {
    //  System.import('app/g').then((dom) => {
    console.log(dom);
    console.log(dom.querySelector(document, '#redirect'));
    // });
    console.log(this);
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