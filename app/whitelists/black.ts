
import {Component, Input} from '@angular/core';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';


@Component({
    selector: 'black',
    template: `<h3>black</h3>
    {{props.title}}
               <input type='button' (click)="props.addblack(gettime())" />
         `,
    //  styleUrls: ['app/whitelists/whitelist.css'],
    directives: [ROUTER_DIRECTIVES]
})
export class Black {
    @Input() props: { title: string, isshow: boolean, addblack: (title: string) => void };
    curtime: Date;
    constructor() {
        this.props = this.props || { title: 'default', isshow: false, addblack: null };
    }
    ngOnInit() {
        console.log(this.props);
    }
    gettime(): string {
        return new Date().toLocaleTimeString();
    }
}