import {Component, Input, AfterContentInit, QueryList, Query  } from '@angular/core';

@Component({
    selector: 'tab',
    inputs: ['title'],
    template: `
 <li [class.active]="active">

</li>
   <ng-content></ng-content>
 `
})
export class Tab {
    @Input('title') title: string;
    active: boolean = false;
    name: string;
}

@Component({
    selector: 'tabset',
    template: `
 <ul class="nav nav-tabs">
    <a *ngFor="let tab of tabs"  [class.active]="tab.active" (click)="setActive(tab)">
        {{ tab.title }}
    </a>
    <ng-content></ng-content>
 </ul>
 
 `
})
export class Tabset implements AfterContentInit {
    tabs: QueryList<Tab>;

    constructor( @Query(Tab) tabs: QueryList<Tab>) {
        this.tabs = tabs;
    }

    ngAfterContentInit() {
        this.tabs.toArray()[0].active = true;
    }

    setActive(tab: Tab) {
        this.tabs.toArray().forEach((t) => t.active = false);
        tab.active = true;
    }
}

