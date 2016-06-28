import {Component, ElementRef, Inject, OnInit} from '@angular/core';


@Component({
    selector: 'jquery-integration',
    templateUrl: 'app/jquery/jquery-integration.html'
})

export class JqueryIntegration implements OnInit {
    elementRef: ElementRef;

    constructor( @Inject(ElementRef) elementRef: ElementRef) {
        this.elementRef = elementRef;
        console.log(this.elementRef);
    }

    ngOnInit() {
        $(this.elementRef.nativeElement)
            .find('.moving-box')
            .draggable({ containment: '#draggable-parent' });
    }
}