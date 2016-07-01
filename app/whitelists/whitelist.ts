/**
 * Created by sunjiaqi on 16-5-13.
 */
import {Component} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';

@Component({
    selector: 'whitelist',
    templateUrl: 'app/whitelists/whitelist.html',
    styleUrls: ['app/whitelists/whitelist.css'],
    directives: [ROUTER_DIRECTIVES]
})

export class WhiteList {

    constructor(public router: Router) {
    }
}