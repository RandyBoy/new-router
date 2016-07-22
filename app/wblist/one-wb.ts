import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import { NgIf } from '@angular/common';
import { WeiBoModel } from './wbModel';
import CommentForm  from './CommentForm';
import ContentImage  from './ContentImage';
import {CommentListComponent} from './commentList';

@Component({
    moduleId: module.id,
    selector: 'one-wb',
    templateUrl: 'onewb.html',
    directives: [CommentForm, ContentImage, NgIf, CommentListComponent]
})
export default class OneWB implements OnInit {
    @Input() oneData: WeiBoModel;
    state: { isComment?: boolean, isForward?: boolean, isCollect?: boolean, isPointGreat?: boolean };
    //  commentFormProps: { imgUrl: string, onAddComment: () => void }
    constructor() {
        this.state = { isComment: false, isForward: false, isCollect: false, isPointGreat: false };
    }

    ngOnInit() {
        // this.commentFormProps = { imgUrl: this.oneData.headUrl, onAddComment: this.addComment };
    }
    handlerForwardClick(event: Event) {
        let innerText = (event.target as HTMLElement).innerText;
        if (innerText == '评论') {
            this.state.isComment = !this.state.isComment;
        } else if (innerText == '赞') {
            this.oneData.NoPointGreat += 1;
            this.state.isPointGreat = !this.state.isPointGreat;
        } else if (innerText == "转发") {
            this.oneData.NoForward += 1;
            this.state.isForward = !this.state.isForward;
        } else if (innerText == '收藏') {
            if (this.state.isCollect) {
                this.oneData.NoCollect += 1;
            } else {
                this.oneData.NoCollect -= 1;
            }
            this.state.isCollect = !this.state.isCollect;
        }
        else {
            this.state.isComment = false;
        }
    }
    
    addComment = (comment: string) => {
        console.log(comment);
        this.oneData.comments.push(comment);
        this.oneData.NoComment += 1;
        this.state.isComment = false;
    }

    delComment = (comment: string) => {
        let idx = this.oneData.comments.indexOf(comment);
        if (idx > -1) {
            this.oneData.comments.splice(idx, 1);
            this.oneData.NoComment -= 1;
        }
        console.log(this.oneData.comments);
    }

    clearComments = () => {
        this.oneData.comments.splice(0);
        this.oneData.NoComment = 0;
    };

    get commentFormProps() {
        return {
            imgUrl: this.oneData.headUrl,
            onAddComment: this.addComment
        };
    }
    get commentListProps() {
        return {
            comments: this.oneData.comments,
            onClearComments: this.clearComments,
            onDelComment: this.delComment
        }
    }


}