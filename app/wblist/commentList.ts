import { Component, OnInit, Input} from '@angular/core';
import { NgFor } from '@angular/common';
import {CommentComponent} from './comment'

@Component({
    moduleId: module.id,
    selector: 'CommentList',
    directives: [CommentComponent, NgFor],
    template: ` <div>
                  <ul>
                    <li *ngFor="let comment of commentModel.comments" >
                       <Comment bind-comment="commentProp(comment)"></Comment>
                    </li>
                  </ul>
               </div>
    `
})
export class CommentListComponent implements OnInit {
    @Input() commentModel: { comments: string[], onClearComments?: () => void, onDelComment?: (title: string) => void };

    constructor() {
        this.commentModel = this.commentModel || { comments: [] };
    }
    ngOnInit() { }

    commentProp(content: string) {
        return {
            content: content || '评语',
            onDelComment: this.commentModel.onDelComment
        }
    }


}
