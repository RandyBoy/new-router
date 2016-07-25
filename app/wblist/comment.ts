import { Component, OnInit, Input, OnDestroy, Host, SkipSelf, Optional} from '@angular/core';
import { Parent } from '../container/parent';

@Component({
    moduleId: module.id,
    selector: 'Comment',
    template: `           
             {{comment.content}} <span><button on-click="comment.onDelComment(comment.content)" >X</button></span>
    `
})
export class CommentComponent extends Parent implements OnInit {

    @Input() comment: { content: string, onDelComment: (title: string) => void };
    constructor( @Optional() public parent: Parent) {
        super(parent);
    }

    ngOnInit() {

        this.attach();

    }

    ngOnDestroy() {

        this.dettach();

    }



}