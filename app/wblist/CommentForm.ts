import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef, OnDestroy, Host, SkipSelf, Optional} from '@angular/core';
import {Base, IEventArgs, CallMethod, CallProp} from '../container/base';
import {AppComponent} from '../app.component';

interface CommentFormArgs extends IEventArgs {
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
        console.log(this.ancestor);
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
        this.ancestor
            .eventBus
            .post(commentArgs)
            .post({
                type: 'onMessage',  //类型
                playload: {
                    method: 'onMessage',
                    params: ['通知方式调用']
                }
            });

        //  this.root.request({ comp: 'onewb', method: 'addComment', params: [comment] });
        this.root.eventBus.post({
            type: 'myevent',
            playload: {
                msg: comment,
                parentid: this.parent.name,
                filter: (args) => this.name === this.parent.name,
                callback: () => { }
            }
        });
    }

    show(msg: string) {
        console.log("CommentForm:" + msg + this.show.name);
    }

    dispatchAction(action: IEventArgs) {
        super.dispatchAction(action);
        if (action.type === 'onMessage') {
            console.log('OnMessage：' + this.eventBusHandler.name);
        }
    }

    eventBusHandler(action: IEventArgs) {
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