import { Component, OnInit, Input, ViewEncapsulation, SkipSelf, Optional, AfterViewInit, AfterContentInit } from '@angular/core';
import { WeiBoModel  } from './wbmodel';
import OneWB  from './one-wb';
import {WeiBoStore} from './wbstore';
import {Base, provideTheParent} from '../container/base';

@Component({
    moduleId: module.id,
    selector: 'ListWb',
    templateUrl: './listWb.html',
    directives: [OneWB],
    providers: [WeiBoStore, provideTheParent(ListWb)],
    styleUrls: ['./wblist.css'],
    encapsulation: ViewEncapsulation.Native
})
export class ListWb extends Base implements OnInit, AfterViewInit {
    @Input() wbDatas: WeiBoModel[] = [];

    constructor( @SkipSelf() @Optional() public parent: Base, private weiBoStore: WeiBoStore) {
        super(parent);
    }

    ngOnInit() {

        this.wbDatas = this.wbDatas || this.weiBoStore ? this.weiBoStore.GetALLWeiBo() : null;
        this.attach();
        this.setRoot();
    }
    ngOnDestroy() {
        this.dettach();
    }
    ngAfterViewInit() {

    }

    ngAfterContentInit() {

    }

}