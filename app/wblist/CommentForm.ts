import { Component, OnInit, Input, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'comment-form',
    templateUrl: 'comment-form.html'
})
export default class CommentForm implements OnInit {
    @Input() props: { imgUrl: string, onAddComment: (content: string) => void };
    @ViewChild('comment') comment: ElementRef;
    constructor() {
        // this.props = this.props || { imgUrl: 'null', onAddComment: () => { } };
    }

    ngOnInit() {

    }

    onCtrlEnter(comment: string) {     
        this.props.onAddComment(comment); //(this.comment || { value: '无法获取值' }).value
    }
}