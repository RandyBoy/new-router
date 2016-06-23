import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { Observable, Subject, BehaviorSubject } from 'rxjs/rx';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';

@Injectable()
export class AuthService {
    isLoggedIn: boolean = false;

    signupUrl: string;
    loginUrl: string;
    currentUser: User;
    public authError: Subject<string> = new BehaviorSubject<string>(null);
    public userJoined: Subject<string> = new BehaviorSubject<string>(null);

    logout() {
        this.isLoggedIn = false;
    }

    signup(username: string, password: string, avatar: string): Promise<void> {
        return Promise.resolve();
    }

    login(username: string, password: string): Observable<void> {
        return this.post(this.loginUrl, username, password);
    }

    private post(url: string, username: string, password: string, avatar?: string): Observable<any> {
        return Observable.of(true)
            .delay(1000)
            .do(val => {
                this.isLoggedIn = true;
                let curUser = new User({ username: username, password: password });
                localStorage.setItem('jwt', JSON.stringify(curUser));
                this.currentUser = curUser;              
            });
    }

    getCurrentUser(): User {
        if (this.currentUser == null) {
            let jwt = localStorage.getItem('jwt');
            if (jwt) {
                this.currentUser = new User(JSON.parse(jwt)); //this.jwtHelper.decodeToken(jwt)
            } else {
                this.authError.next('no user signed in.');
            }
        }
        return this.currentUser;
    }
}