import { Component, OnInit, Input, OnDestroy,SkipSelf,Host,Optional} from '@angular/core';
import { NgFor } from '@angular/common';
import {CommentComponent} from './comment';
import {Parent,provideTheParent} from '../container/parent';

@Component({
    moduleId: module.id,
    selector: 'CommentList',
    directives: [CommentComponent, NgFor],
    providers:[provideTheParent(CommentListComponent)]
    ,
    template: ` <div>
                  <ul>
                    <li *ngFor="let comment of commentModel.comments" >
                       <Comment bind-comment="commentProp(comment)"></Comment>
                    </li>
                  </ul>
               </div>
    `
})
export class CommentListComponent extends Parent implements OnInit, OnDestroy {
    @Input() commentModel: { comments: string[], onClearComments?: () => void, onDelComment?: (title: string) => void };
    @Input() context: any = {};

    constructor( @SkipSelf() @Optional() public parent: Parent) {
        super(parent);
        this.commentModel = this.commentModel || { comments: [] };
    }
    ngOnInit() {
        // console.log(this.context);
        // this.context.treeDict['commentlist'] = { name: "commentlist", comp: this, childs: [] };
            this.attach();  
       // this.parent.childs.push(this);
    }
    ngOnDestroy() {
 
            this.dettach();
    }

    commentProp(content: string) {
        return {
            content: content || '评语',
            onDelComment: this.commentModel.onDelComment
        }
    }
    show(msg: string) {
        console.log("CommentList:" + msg);
    }


}
