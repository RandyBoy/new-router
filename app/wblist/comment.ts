import { Component, OnInit, Input, OnDestroy, Host, SkipSelf, Optional} from '@angular/core';
import { Base } from '../container/base';

@Component({
    moduleId: module.id,
    selector: 'Comment',
    template: `           
             {{comment.content}} <span><button on-click="comment.onDelComment(comment.content)" >X</button></span>
    `
})
export class CommentComponent extends Base implements OnInit {

    @Input() comment: { content: string, onDelComment: (title: string) => void };
    constructor( @Optional() @SkipSelf() public parent: Base) {
        super(parent);
    }

    ngOnInit() {
        this.attach();
        // console.log(this.root.findComponentList(CommentComponent));
    }

    ngOnDestroy() {
        this.dettach();
    }



}