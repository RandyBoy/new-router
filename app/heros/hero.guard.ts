import { Injectable } from '@angular/core';
import { CanActivate, CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import {Observable}from 'rxjs/rx';
import { CanComponentDeactivate } from '../interfaces';

@Injectable()
export class AllowActivate implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return Observable.of(true).delay(0);
    }
}

@Injectable()
export class AllowDeactivate implements CanDeactivate<CanComponentDeactivate> {
    canDeactivate(component: any, route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return Observable.of(true).delay(0);
    }
}