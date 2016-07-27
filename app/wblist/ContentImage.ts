import { Component, OnInit, Input, ViewEncapsulation} from '@angular/core';
import {NgFor} from '@angular/common';

@Component({
    moduleId: module.id,
    selector: 'content-image',
    templateUrl: 'ContentImage.html',
    directives: [NgFor]
})
export default class ContentImage implements OnInit {
    @Input() contentImageUrls: string[];
    constructor() { }
    ngOnInit() { }
}