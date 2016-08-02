import { WeiBoModel  } from './wbmodel';

import { Injectable } from '@angular/core';

@Injectable()
export class wbState {

    isComment: boolean;
    currentComment:string;
    isForward: boolean;
    isCollect: boolean;
    isPointGreat: boolean;
    wbData: WeiBoModel;
    constructor() { }
    addComment = (comment: string) => {
        this.wbData.comments.push(comment);
        this.wbData.NoComment += 1;
        this.isComment = false;
    }

    delComment = (comment: string) => {
        let idx = this.wbData.comments.indexOf(comment);
        if (idx > -1) {
            this.wbData.comments.splice(idx, 1);
            this.wbData.NoComment -= 1;
        }
    }

    clearComments = () => {
        this.wbData.comments.splice(0);
        this.wbData.NoComment = 0;
    };

    openComment() {
        this.isComment = !this.isComment;
    }
    
    editComment(comment:string){
        this.isComment = true;
        this.currentComment = comment;
    }


}