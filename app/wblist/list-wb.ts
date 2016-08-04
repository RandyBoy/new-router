import { Component, OnInit, Input, ViewEncapsulation, SkipSelf, Optional, AfterViewInit, AfterContentInit } from '@angular/core';
import { WeiBoModel  } from './wbmodel';
import OneWB  from './one-wb';
import {WeiBoStore} from './wbstore';
import {Base, provideTheParent} from '../container/base';
import * as wbEventType from './wbEventType';
import {EventBus} from '../EventBus';

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

    constructor( @SkipSelf() @Optional() public parent: Base,
        private weiBoStore: WeiBoStore,
        public eventBus: EventBus) {
        super(parent);
    }

    ngOnInit() {
        super.ngOnInit();
        this.wbDatas = this.wbDatas || this.weiBoStore ? this.weiBoStore.GetALLWeiBo() : null;
        this.weiBoStore.weiBoDatas = this.weiBoStore.GetALLWeiBo();
        // this.attach();
        this.setRoot();
        this.eventBus
            .subscribe(wbEventType.AddComment, (actionArgs) => {
                console.log("listwb接收到wb.AddComment事件信息:" + actionArgs.playload.msg);
            });
        this.eventBus.subscribe(wbEventType.DelComment, (args) => {
            console.log("listwb接收到wb.DelComment事件信息:" + args.playload.msg);
        });
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        // this.dettach();
    }
    ngAfterViewInit() {

    }

    ngAfterContentInit() {

    }

    get wbDataList() {
        return this.weiBoStore.weiBoDatas || [];
    }

}