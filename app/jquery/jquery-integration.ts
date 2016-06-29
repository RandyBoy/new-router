import {Component, ElementRef, Inject, OnInit} from '@angular/core';


@Component({
    selector: 'jquery-integration',
    templateUrl: 'app/jquery/jquery-integration.html'
})

export class JqueryIntegration implements OnInit {
    elementRef: ElementRef;

    constructor( @Inject(ElementRef) elementRef: ElementRef) {
        this.elementRef = elementRef; //获取当前组件元素
    }

    ngOnInit() {
        $(this.elementRef.nativeElement)
            .find('.moving-box')
            .draggable({ containment: '#draggable-parent' });

    }
}