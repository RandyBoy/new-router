import { WeiBoModel  } from './wbmodel';

import { Injectable } from '@angular/core';
import {StateBase} from '../container/stateBase';
import {isType, isString, isBlank, isArray, isFunction} from "@angular/common/src/facade/lang";

@Injectable()
export class wbState extends StateBase {

    isComment: boolean;
    currentComment: string;
    isForward: boolean;
    isCollect: boolean;
    isPointGreat: boolean;
    wbData: WeiBoModel;
    constructor() {
        super();
    }

    addComment = (comment: string | { msg: string }) => {
        let content;
        if (isString(comment)) {
            content = comment;
        } else {
            content = comment.msg;
        }
        this.wbData.comments.push(content);
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

    editComment(comment: string) {
        this.isComment = true;
        this.currentComment = comment;
    }


}