import { Component, OnInit, Input } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'Comment',
    template: `           
             {{comment.content}} <span><button on-click="comment.onDelComment(comment.content)" >X</button></span>
    `
})
export class CommentComponent implements OnInit {

    @Input() comment: { content: string, onDelComment: (title: string) => void };
    constructor() { }

    ngOnInit() {
        
     }

   

}