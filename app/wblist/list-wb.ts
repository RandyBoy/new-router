import { Component, OnInit, Input, ViewEncapsulation, SkipSelf, Optional, AfterViewInit, AfterContentInit } from '@angular/core';
import { WeiBoModel  } from './wbmodel';
import OneWB  from './one-wb';
import {WeiBoStore} from './wbstore';
import {Base, provideTheParent} from '../container/base';
import { EventBus } from '../EventBus';

@Component({
    moduleId: module.id,
    selector: 'ListWb',
    templateUrl: './listWb.html',
    directives: [OneWB],
    providers: [WeiBoStore, provideTheParent(ListWb), EventBus],
    styleUrls: ['./wblist.css'],
    encapsulation: ViewEncapsulation.Native
})
export class ListWb extends Base implements OnInit, AfterViewInit {
    @Input() wbDatas: WeiBoModel[] = [];

    constructor( @SkipSelf() @Optional() public parent: Base, private weiBoStore: WeiBoStore, _eventBus: EventBus) {
        super(parent);
        this.eventBus = _eventBus;
    }

    ngOnInit() {

        this.wbDatas = this.wbDatas || this.weiBoStore ? this.weiBoStore.GetALLWeiBo() : null;
        this.attach();
        this.setRoot();
        this.eventBus
            .subscribe('myevent', (actionArgs) => {
                console.log("listwb接收到信息:" + actionArgs.playload.msg);
            });
    }
    ngOnDestroy() {
        this.dettach();
    }
    ngAfterViewInit() {

    }

    ngAfterContentInit() {

    }

}