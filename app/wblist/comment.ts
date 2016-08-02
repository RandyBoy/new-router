import { Component, OnInit, Input, OnDestroy, Host, SkipSelf, Optional} from '@angular/core';
import { Base } from '../container/base';
import {CreateDelComment, CreateSetComment} from './wbActions';

@Component({
    moduleId: module.id,
    selector: 'Comment',
    template: `           
             {{comment.content}} 
             <span><button on-click="delComment(comment.content)" >del</button></span>
             <span><button on-click="editComment()" >edit</button></span>
    `
})
export class CommentComponent extends Base implements OnInit {

    @Input() comment: { content: string, onDelComment: (title: string) => void };
    constructor( @Optional() @SkipSelf() public parent: Base) {
        super(parent);
    }

    ngOnInit() {
        super.ngOnInit();
        // console.log(this.root.findComponentList(CommentComponent)); comment.onDelComment(comment.content)
    }

    ngOnDestroy() {
        super.ngOnDestroy();
    }
    delComment(comment: string) {
        this.parent.parent.dispatch(CreateDelComment(comment));
    }

    editComment() {
        this.parent.parent.dispatch(CreateSetComment(this.comment.content));
    }



}