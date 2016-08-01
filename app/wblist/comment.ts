import { Component, OnInit, Input, OnDestroy, Host, SkipSelf, Optional} from '@angular/core';
import { Base } from '../container/base';
import * as wbEventType from './wbEventType';

@Component({
    moduleId: module.id,
    selector: 'Comment',
    template: `           
             {{comment.content}} <span><button on-click="delComment(comment.content)" >X</button></span>
    `
})
export class CommentComponent extends Base implements OnInit {

    @Input() comment: { content: string, onDelComment: (title: string) => void };
    constructor( @Optional() @SkipSelf() public parent: Base) {
        super(parent);
    }

    ngOnInit() {
        this.attach();
        // console.log(this.root.findComponentList(CommentComponent)); comment.onDelComment(comment.content)
    }

    ngOnDestroy() {
        this.dettach();
    }

    delComment(comment: string) {
        this.root.eventBus.dispatch({
            type: wbEventType.DelComment,
            playload: {
                wbid: this.parent.parent.name,
                msg: comment
            }
        });
    }



}