import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef, OnDestroy, Host, SkipSelf, Optional} from '@angular/core';
import {Base, IAction, CallMethod, CallProp} from '../container/base';
import {AppComponent} from '../app.component';
import * as  wbEventType  from './wbEventType';

interface CommentFormArgs extends IAction {
    playload: {
        method: string;
        params: any[];
        extra: any;
        filter: (a) => boolean;
    }
}

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
        console.log(this.context);
        // console.log(this.findComp(AppComponent, this));

    }
    ngOnDestroy() {
        super.ngOnDestroy();
    }

    onCtrlEnter(comment: string) {

        // this.props.onAddComment(comment);
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
        //{
        // type: CallMethod,
        // playload: {
        //     method: 'show',
        //     params: ['全局通知方式调用-globalEvent']
        // }

        let commentArgs: CommentFormArgs = {
            type: CallMethod,
            playload: {
                method: 'show',
                params: ['自定义事件参数'],
                extra: (a) => { a.id === 15 },
                filter: (a) => true
            }
        };
        this.context
            .eventBus
            .dispatch(commentArgs)
            .dispatch({
                type: 'onMessage',  //类型
                playload: {
                    method: 'onMessage',
                    params: ['通知方式调用']
                }
            });

        //  this.root.request({ comp: 'onewb', method: 'addComment', params: [comment] });
        // this.root.eventBus.dispatch({
        //     type: wbEventType.AddComment,
        //     playload: {
        //         msg: comment,
        //         wbid: this.parent.name,
        //         filter: (args) => this.name === this.parent.name,
        //         callback: () => { }
        //     }
        // });
        this.root.eventBus.dispatch({
            type: wbEventType.AddComment,
            playload: {
                msg: comment,
                wbid: this.parent.name
            }
        }, true);
    }

    show(msg: string) {
        console.log("CommentForm:" + msg + this.show.name);
    }

    reducer(action: IAction) {
        super.reducer(action);
        switch (action.type) {
            case 'onMessage':
                console.log('OnMessage：' + '我怎么会收到信息呢');
                break;
            default:
                break;
        }
    }

    eventBusHandler(action: IAction) {
        for (let index = 0; index < arguments.length; index++) {
            console.log(arguments[index]);
        }
        super.eventBusHandler(action);
        if (action.type === 'onMessage') {
            console.log('OnMessage：' + this.eventBusHandler.name);
        }
        let c = getCounter();
        c(10);
        c.reset();
        c.interval = 5.0;
    }
}

/**
 * 定义一个接口
 */
interface Counter {
    (start: number): string;
    interval: number;
    reset(): void;
}
/**
 * 函数实现接口，实现混合类型，既可当函数用，也有自己的属性
 */
function getCounter(): Counter {
    let counter = <Counter>function (start: number) { };
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}