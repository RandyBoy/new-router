import {
    Component, Directive, ViewChild,
    OnInit, Input, ViewContainerRef,
    TemplateRef, ComponentResolver, ComponentMetadata,
    ReflectiveInjector, ComponentFactory, ComponentFactoryResolver
} from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { FORM_DIRECTIVES, FormBuilder, REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { ROUTER_DIRECTIVES, Router } from '@angular/router';
import { Observable } from 'rxjs/rx';
import { UnlessDirective } from '../directives/unless-directive';
import { DynamicComponent } from './DynamicComponent';

@Component({
    moduleId: module.id,
    selector: 'basic-form-mux',
    templateUrl: './basic-form-mux.html',
    directives: [CORE_DIRECTIVES, UnlessDirective]
})
export class BasicFormMux implements OnInit {
    @Input('template') template: string;
    @ViewChild('muxContent', { read: ViewContainerRef }) contentTarget: ViewContainerRef;
    @ViewChild('muxContentB', { read: ViewContainerRef }) contentTargetB: ViewContainerRef;

    toggle: boolean = false;
    constructor(private componentResolver: ComponentResolver) {
    }

    ngOnInit() {
        this.componentResolver
            .resolveComponent(this.createContentComponent(this.template))
            .then((factory: any) => this.contentTarget.createComponent(factory));

        //  this.contentTargetB
        //  .createComponent(this.createComponent(,
        //     this.contentTargetB.parentInjector).get(Login)));
        // console.log(ReflectiveInjector.resolveAndCreate([Login],
        //     this.contentTargetB.parentInjector).get(Login));

        this.dynamicLoadComponent(DynamicComponent, [this.contentTarget, this.contentTargetB]);
        //.create(this.contentTargetB.parentInjector, [], '#muxContentB');
    }

    createContentComponent(template: string): any {
        @Component({
            moduleId: module.id,
            selector: 'dynamic-component-load-html2',
            template: template,
            directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES, UnlessDirective]
        })
        class MuxContent {
            constructor(formBuilder: FormBuilder) { }
            login(modelValue: any): Observable<boolean> | boolean {
                console.log("dynamicLoginComponent:" + JSON.stringify(modelValue));
                return false;
            }
        }
        return MuxContent;
    }

    dynamicLoadComponent(component: any, vcfs: ViewContainerRef[]) {

        this.componentResolver
            .resolveComponent(component)
            .then((factory: ComponentFactory<any>) => {
                vcfs.forEach(vcf => {
                    vcf.createComponent(factory);
                });
            });
    }

}