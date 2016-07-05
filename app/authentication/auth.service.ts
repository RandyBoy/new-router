import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../models/user';
import { Observable, Subject, BehaviorSubject } from 'rxjs/rx';
import {JwtHelper} from 'angular2-jwt';
import { contentHeaders } from '../utils/headers';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;
    jwt: any;
    decodedJwt: any;
    private port = 9000;
    private signupUrl = 'http://localhost:' + this.port + '/users';
    private loginUrl = 'http://localhost:' + this.port + '/sessions/create';

    currentUser: User;
    public authError: Subject<string> = new BehaviorSubject<string>(null);
    public userJoined: Subject<string> = new BehaviorSubject<string>(null);

    /**
     *
     */
    constructor(private http: Http, private jwtHelper: JwtHelper) {
        this.jwt = null;
        this.decodedJwt = null;
        this.currentUser = null;
        this.isLoggedIn = false;
    }

    logout() {
        this.isLoggedIn = false;
        localStorage.removeItem('jwt');
        this.jwt = null;
        this.decodedJwt = null;
        this.currentUser = null;
    }

    signup(username: string, password: string, avatar: string): Promise<void> {
        return this.post(this.signupUrl, username, password, 'avatar');
    }

    login(username: string, password: string): Promise<void> {
        return this.post(this.loginUrl, username, password);
    }

    private post(url: string, username: string, password: string, avatar?: string): Promise<void> {

        let body = JSON.stringify({ username, password, avatar });
        return this.http.post(url, body, { headers: contentHeaders }).toPromise()
            .then(response => {
                let userJson = response.json();
                this.isLoggedIn = true;
                this.jwt = userJson.id_token;
                localStorage.setItem('jwt', this.jwt);
                this.decodedJwt = this.jwt && this.jwtHelper.decodeToken(this.jwt)
                this.currentUser = new User(this.jwtHelper.decodeToken(userJson.id_token));
                //this.publishUserJoined(this.currentUser);
            }, error => {
                this.authError.next(error.text());
                console.log(error.text());
            });
    }

    getCurrentUser(): User {
        if (this.currentUser == null) {
            let jwt = localStorage.getItem('jwt');
            if (jwt) {
                this.currentUser = new User(this.jwtHelper.decodeToken(jwt));
            } else
                this.authError.next('no user signed in.');
        }
        return this.currentUser;
    }

    relogin() {
        Observable.timer(1000, 5000).subscribe((val) => {
            if (this.jwtHelper.isTokenExpired(this.jwt, 10)) {

            }
        }
        );
    }

}