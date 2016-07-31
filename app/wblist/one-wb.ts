import { Component, OnInit, Input, ViewEncapsulation, SkipSelf, Optional, OnDestroy} from '@angular/core';
import { NgIf } from '@angular/common';
import { WeiBoModel } from './wbModel';
import CommentForm  from './CommentForm';
import ContentImage  from './ContentImage';
import {CommentListComponent} from './commentList';
import {Base, provideTheParent} from '../container/base';
import {EventService} from '../utils/eventService';
import { IEventArgs } from '../container/Base';
import * as WbEventType  from './wbEventType';

export interface bbc { b: string[], c: {} }
interface StringArray {
    [index: number]: string;
}
interface NumberDictionary {
    [index: string]: number;
    length: number;
}

@Component({
    moduleId: module.id,
    selector: 'one-wb',
    templateUrl: 'onewb.html',
    directives: [CommentForm, ContentImage, NgIf, CommentListComponent],
    providers: [provideTheParent(OneWB)],
})
export default class OneWB extends Base implements OnInit {

    @Input() oneData: WeiBoModel;
    state: { isComment?: boolean, isForward?: boolean, isCollect?: boolean, isPointGreat?: boolean };
    //  commentFormProps: { imgUrl: string, onAddComment: () => void }
    constructor( @SkipSelf() @Optional() public parent: Base) {
        super(parent);
        this.state = { isComment: false, isForward: false, isCollect: false, isPointGreat: false };
    }

    treeDict: { [key: string]: { name: string, comp: any, childs: any[] } };

    subscribies = [WbEventType.AddComment, WbEventType.DelComment];

    ngOnInit() {

        // this.name = 'onewb';
        // this.treeDict = { 'root': { name: 'root', comp: this, childs: [] } };
        // console.log(this);
        // // this.commentFormProps = { imgUrl: this.oneData.headUrl, onAddComment: this.addComment };
        // let a = { a: 'b', b: ['a', 'b', 'c'], c: { c1: 'ab', c2: [1, 2] } };
        // let result = copy({ b: [], c: {} } as bbc, a);
        // let x = { a: 1, b: 2, c: 3, d: 4, f: 50 };

        // let copyField = copyFields({ b: [], c: {} } as bbc, a); // okay
        // console.log(copyField);
        // console.log(result);
        // let myArray: StringArray;
        // myArray = { 0: "Bob", 1: "Fred" }; // ["Bob", "Fred"];
        // console.log(myArray[0]);
        // console.log(myArray);
        // let mydict: NumberDictionary;
        // mydict = { 'abc': 1, 'def': 2, length: 3 };
        // console.log(mydict);
        // let {a1, b1} = { a1: "baz", b1: 101 };
        super.ngOnInit();
        this.root
            .eventBus
            .subscribe(this.subscribies, this.regFun);
    }

    ngOnDestroy() {
        super.ngOnDestroy();
        this.root
            .eventBus
            .unSubscribe(this.subscribies, this.regFun);
    }
    handlerForwardClick(event: Event) {
        let innerText = (event.target as HTMLElement).innerText;
        if (innerText == '评论') {
            this.state.isComment = !this.state.isComment;
        } else if (innerText == '赞') {
            this.oneData.NoPointGreat += 1;
            this.state.isPointGreat = !this.state.isPointGreat;
        } else if (innerText == "转发") {
            this.oneData.NoForward += 1;
            this.state.isForward = !this.state.isForward;
        } else if (innerText == '收藏') {
            if (this.state.isCollect) {
                this.oneData.NoCollect += 1;
            } else {
                this.oneData.NoCollect -= 1;
            }
            this.state.isCollect = !this.state.isCollect;
        }
        else {
            this.state.isComment = false;
        }
    }

    dispatchAction(eventArgs: IEventArgs) {
        super.dispatchAction(eventArgs);
        if (this.name === eventArgs.playload.wbid) {
            if (eventArgs.type === WbEventType.AddComment) {
                this.addComment(eventArgs.playload.msg);
            } else if (eventArgs.type === WbEventType.DelComment) {
                this.delComment(eventArgs.playload.msg);
            }
        }
    }

    addComment = (comment: string) => {
        this.oneData.comments.push(comment);
        this.oneData.NoComment += 1;
        this.state.isComment = false;
    }

    delComment = (comment: string) => {
        let idx = this.oneData.comments.indexOf(comment);
        if (idx > -1) {
            this.oneData.comments.splice(idx, 1);
            this.oneData.NoComment -= 1;
        }
    }

    clearComments = () => {
        this.oneData.comments.splice(0);
        this.oneData.NoComment = 0;
    };

    get commentFormProps() {

        return {
            imgUrl: this.oneData.headUrl,
            onAddComment: this.addComment
        };
    }
    get commentListProps() {
        return {
            comments: this.oneData.comments,
            onClearComments: this.clearComments,
            onDelComment: this.delComment
        }
    }
    get mySelf(): this {
        return this;
    }


}

function extend<T, U>(first: T, second: U): T & U {
    let result = <T & U>{};
    for (let id in first) {
        (<any>result)[id] = (<any>first)[id];
    }
    for (let id in second) {
        if (!result.hasOwnProperty(id)) {
            (<any>result)[id] = (<any>second)[id];
        }
    }
    return result;
}
function copy<T, U>(first: T, second: U): T {
    let result = <T>{};
    Object.keys(first).forEach(key => {
        if (second.hasOwnProperty(key)) {
            result[key] = second[key];
        }
    });
    return result;
}
function copyFields<T, U extends T>(target: T, source: U): T {
    for (let id in target) {
        target[id] = source[id];
    }
    return target;
}
//泛型工厂

function create<T>(c: { new (): T; }): T {
    return new c();
}