import {
    Component, Directive, ViewChild,
    OnInit, Input, ViewContainerRef,
    ComponentResolver, ComponentMetadata, ReflectiveInjector,
    ComponentFactory
} from '@angular/core';
import {FORM_DIRECTIVES, FormBuilder} from '@angular/common';

@Directive({
    selector: 'dynamic-html-outlet',
})
export class DynamicHTMLOutlet {
    @Input() src: string;

    constructor(private vcRef: ViewContainerRef, private resolver: ComponentResolver) {
    }

    ngOnChanges() {
        if (!this.src) return;
        const metadata = new ComponentMetadata({
            selector: 'dynamic-html',
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
    const cmpClass = class DynamicComponent { };
    const decoratedCmp = Component(metadata)(cmpClass);
    return resolver.resolveComponent(decoratedCmp);
}

@Component({
    selector: 'basic-form-mux',
    template: '<template #muxContent></template>',
})
export class BasicFormMux implements OnInit {
    @Input('template') template: string;
    @ViewChild('muxContent', { read: ViewContainerRef }) contentTarget: ViewContainerRef;
    constructor(private componentResolver: ComponentResolver) { }

    ngOnInit() {
        console.log(this.contentTarget);
        this.componentResolver
            .resolveComponent(this.createContentComponent(this.template))
            .then((factory: any) => this.contentTarget.createComponent(factory));
    }

    createContentComponent(template: string): any {
        @Component({
            template: template,
            directives: [
                //  FORMSY_BS_DIRECTIVES,
                FORM_DIRECTIVES
            ]
        })
        class MuxContent {
            constructor(formBuilder: FormBuilder) {
                //  super(formBuilder);
            }
        }
        return MuxContent;
    }
}