import { Component, OnInit, Input, OnDestroy, SkipSelf, Host, Optional} from '@angular/core';
import { NgFor } from '@angular/common';
import {CommentComponent} from './comment';
import {Base, provideTheParent} from '../container/base';
import {CreateClearComment} from './wbActions';

@Component({
    moduleId: module.id,
    selector: 'CommentList',
    directives: [CommentComponent, NgFor],
    providers: [provideTheParent(CommentListComponent)]
    ,
    template: ` <div>
                  <span><button on-click="clearComments()" >清除</button></span>
                  <ul>
                    <li *ngFor="let comment of commentModel.comments" >
                       <Comment bind-comment="commentProp(comment)"></Comment>
                    </li>
                  </ul>
               </div>
    `
})
export class CommentListComponent extends Base implements OnInit, OnDestroy {
    @Input() commentModel: { comments: string[], onClearComments?: () => void, onDelComment?: (title: string) => void };
    @Input() context: any = {};

    constructor( @SkipSelf() @Optional() public parent: Base) {
        super(parent);
        this.commentModel = this.commentModel || { comments: [] };
    }
    ngOnInit() {
        super.ngOnInit();
        // console.log(this.context);
        // this.context.treeDict['commentlist'] = { name: "commentlist", comp: this, childs: [] };

        // this.parent.childs.push(this);
    }
    ngOnDestroy() {

        super.ngOnDestroy();
    }

    commentProp(content: string) {
        return {
            content: content || '评语',
            onDelComment: this.commentModel.onDelComment
        }
    }
    
    clearComments() {
        this.parent.dispatch(CreateClearComment());
    }

    show(msg: string) {
        console.log("CommentList:" + msg);
    }


}
