import {Component} from '@angular/core';
import {NgIf} from '@angular/common';
import {Router, ROUTER_DIRECTIVES} from '@angular/router';
// import {Recognition} from './whitelists-recognition';
// import {White} from './whitelists-white';
import {Black} from './black';

@Component({
    selector: 'white',
    template: `<h3>White--{{model2.timer}}</h3>
               <black [props]="model"></black>
               <div *ngIf="model.isshow">子组件控制父组件状态</div>
    `,
    // styleUrls: ['app/whitelists/whitelist.css'],
    directives: [ROUTER_DIRECTIVES, Black]
})
export class White {

    model: { title: string, isshow: boolean, addblack: (title: string) => void };
    constructor() {
        this.model2 = { isgreate: true, timer: null };
        this.model = { title: '属性传递测试', isshow: false, addblack: this.addblack2 };
    }

    model2: { isgreate: boolean } & { timer: string };

    addblack2 = (title: string) => {
        console.log("属性传递函数调用");
        this.model.isshow = !this.model.isshow;
        this.model.title = title;
        this.model2.timer = new Date().toLocaleString();
    }
}
