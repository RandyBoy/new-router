import {
    Component, Directive, ViewChild, OnInit, Input, ViewContainerRef,
    ComponentResolver, ComponentMetadata, ReflectiveInjector, ComponentFactory
} from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import {FORM_DIRECTIVES, FormBuilder, REACTIVE_FORM_DIRECTIVES} from '@angular/forms';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Observable } from 'rxjs/rx';


@Directive({
    selector: 'dynamic-html-outlet',
})
export class DynamicHtmlOutlet {
    @Input() src: string;

    constructor(private vcRef: ViewContainerRef, private resolver: ComponentResolver) {

    }
    ngOnChanges() {
        if (!this.src) return;
        const metadata = new ComponentMetadata({
            selector: 'dynamic-component-load-html',
            directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES],
            template: this.src,
        });
        createComponentFactory(this.resolver, metadata)
            .then(factory => {
                const injector = ReflectiveInjector.fromResolvedProviders([], this.vcRef.parentInjector);
                this.vcRef.createComponent(factory, 0, injector, []);
            });
    }
}

export function createComponentFactory(resolver: ComponentResolver, metadata: ComponentMetadata): Promise<ComponentFactory<any>> {
    const cmpClass = class DynamicComponentA {
        login(modelValue: any): Observable<boolean> | boolean {
            console.log("dynamicLoginComponent:" + JSON.stringify(modelValue));
            return false;
        }
    };
    const decoratedCmp = Component(metadata)(cmpClass);
    return resolver.resolveComponent(decoratedCmp);
}



