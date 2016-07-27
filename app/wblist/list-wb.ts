import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { WeiBoModel  } from './wbmodel';
import OneWB  from './one-wb';
import {WeiBoStore} from './wbstore'

@Component({
    moduleId: module.id,
    selector: 'ListWb',
    templateUrl: './listWb.html',
    directives: [OneWB],
    providers: [WeiBoStore],
    styleUrls: ['./wblist.css'],
    encapsulation: ViewEncapsulation.Native
})
export class ListWb implements OnInit {
    @Input() wbDatas: WeiBoModel[] = [];
    constructor(private weiBoStore: WeiBoStore) {
    }

    ngOnInit() {
        this.wbDatas = this.weiBoStore.GetALLWeiBo();
    }

}