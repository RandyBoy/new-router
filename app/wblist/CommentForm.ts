import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef, OnDestroy, Host, SkipSelf, Optional} from '@angular/core';
import {Parent} from '../container/parent';

@Component({
    moduleId: module.id,
    selector: 'comment-form',
    templateUrl: 'comment-form.html'
})
export default class CommentForm extends Parent implements OnInit, OnDestroy {
    @Input() props: { imgUrl: string, onAddComment: (content: string) => void };
    @Input() context: {};
    @ViewChild('comment') comment: ElementRef;
    constructor( @Optional() @SkipSelf() public parent: Parent) {
        super(parent);
        // this.props = this.props || { imgUrl: 'null', onAddComment: () => { } };
    }

    ngOnInit() {
        console.log(this);
        this.attach();
        console.log(this.parent.findComponent<CommentForm>(this.name));
        this.parent.findComponent<CommentForm>(this.name).show('成功找到组件');

        console.log(this.parent.findComponentList(CommentForm));

        this.callMethod('show', ['动态调用组件的方法']);

        console.log(this.root.request({ comp: this.name, properyName: 'root' }));



        // this.parent.childs.push(this);
    }
    ngOnDestroy() {
        this.dettach();
    }

    onCtrlEnter(comment: string) {
        this.props.onAddComment(comment); //(this.comment || { value: '无法获取值' }).value
        //  this.root.request({ comp: 'onewb', method: 'addComment', params: [comment] });
        this.root.notify();
    }

    show(msg: string) {
        console.log("CommentForm:" + msg);
    }
}