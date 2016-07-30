import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef, OnDestroy, Host, SkipSelf, Optional} from '@angular/core';
import {Base, IAction, CallMethod, CallProp} from '../container/base';
import {AppComponent} from '../app.component';

@Component({
    moduleId: module.id,
    selector: 'comment-form',
    templateUrl: 'comment-form.html'
})
export default class CommentForm extends Base implements OnInit, OnDestroy {
    @Input() props: { imgUrl: string, onAddComment: (content: string) => void };
    @Input() context: {};
    @ViewChild('comment') comment: ElementRef;
    constructor( @Optional() @SkipSelf() public parent: Base) {
        super(parent);
        // this.props = this.props || { imgUrl: 'null', onAddComment: () => { } };
    }

    ngOnInit() {

        super.ngOnInit();
        //订阅全局事件
        // console.log(this.parent.findComponent<CommentForm>(this.name));
        // this.parent.findComponent<CommentForm>(this.name).show('成功找到组件');

        // console.log(this.parent.findComponentList(CommentForm));



        console.log(this.root.request({ sender: this, target: this, type: CallProp, playload: { prop: 'root' } }, this.name));
        console.log(this.ancestor);
        // console.log(this.findComp(AppComponent, this));

    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }

    onCtrlEnter(comment: string) {

        this.props.onAddComment(comment);
        // let app = this.ancestor as AppComponent;
        //  app.eventService.emit({ target: 'onewb', type: "show" });
        // this.findComp(AppComponent, this);

        // this.root.request({ type: CallMethod, playload: { method: 'addComment2', params: [comment] } }, this.root.name);

        this.root.notify({
            sender: this,
            target: 'abc',
            type: CallMethod,
            playload: {
                method: 'show',
                params: ['通知方式调用']
            }
        }, this.name);


        this.ancestor.ged.notify({
            sender: this,
            target: this,
            type: CallMethod,
            playload: {
                method: 'show',
                params: ['全局通知方式调用-globalEvent']
            }
        }).notify({
            sender: this,
            target: this,
            type: 'onMessage',
            playload: {
                method: 'onMessage',
                params: ['通知方式调用']
            }
        });

        //  this.root.request({ comp: 'onewb', method: 'addComment', params: [comment] });

    }

    show(msg: string) {
        console.log("CommentForm:" + msg);
    }

    dispatchAction(action: IAction) {
        super.dispatchAction(action);
    }

    globalDispatchAction(action: IAction) {
        super.globalDispatchAction(action);
        if (action.type === 'onMessage') {
            console.log(this.ancestor);
        }
    }
}