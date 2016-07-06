import {Component, OnInit, ViewEncapsulation} from '@angular/core';
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
import { Loading } from './loading/loading';
import { URLSearchParams, QueryEncoder } from '@angular/http';


declare var System;

@Component({
  moduleId: module.id,
  selector: 'my-app',
  templateUrl: './app.component.html',
  directives: [ROUTER_DIRECTIVES, COMMON_DIRECTIVES, CollapseDirective, Loading],
  providers: [HeroService, DialogService],
  precompile: [],
  encapsulation: ViewEncapsulation.None
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

    // new headers({'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'});
    let custObj = {
      app_id: 'qbCLpIQ292',
      app_data: {
        page10001: {
          router: "page10001",
          customFeature: { title: "1" },
          eles: [{
            type: "text",
            content: "content1"
          },
            {
              type: "form-vessel",
              customFeature: { form: "test" },
              content: "content2"
            }
          ]
        }
      }
    };
    console.log(this.param(custObj));
    // let urlSearchParams = new URLSearchParams("", new QueryEncoder());
    // urlSearchParams.append('a', this.param(custObj));
    // console.log(urlSearchParams.toString());
    // console.log(decodeURIComponent(this.param(custObj)));

  }
  param(obj) {
    let query = '', name, value, fullSubName, subName, subValue, innerObj, i;

    for (name in obj) {
      value = obj[name];

      if (value instanceof Array) {
        for (i = 0; i < value.length; ++i) {
          subValue = value[i];
          fullSubName = name + '[' + i + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += this.param(innerObj) + '&';
        }
      }
      else if (value instanceof Object) {
        for (subName in value) {
          subValue = value[subName];
          fullSubName = name + '[' + subName + ']';
          innerObj = {};
          innerObj[fullSubName] = subValue;
          query += this.param(innerObj) + '&';
        }
      }
      else if (value !== undefined && value !== null)
        query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
    }
    return query.length ? query.substr(0, query.length - 1) : query;
  };

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