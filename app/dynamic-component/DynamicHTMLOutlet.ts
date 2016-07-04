import {
    Component, Directive, ViewChild, OnInit, Input, ViewContainerRef, TemplateRef,
    ComponentResolver, ComponentMetadata, ReflectiveInjector, ComponentFactory, ComponentFactoryResolver
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
    const cmpClass = class DynamicComponent {
        login(modelValue: any): Observable<boolean> | boolean {
            console.log("dynamicLoginComponent:" + JSON.stringify(modelValue));
            return false;
        }
    };
    const decoratedCmp = Component(metadata)(cmpClass);
    return resolver.resolveComponent(decoratedCmp);
}

@Directive({ selector: '[myUnless]' })
export class UnlessDirective {
    constructor(
        private _templateRef: TemplateRef<any>,
        private _viewContainer: ViewContainerRef
    ) { }
    @Input() set myUnless(condition: boolean) {
        if (!condition) {
            this._viewContainer.createEmbeddedView(this._templateRef);
        } else {
            this._viewContainer.clear();
        }
    }
}




@Component({
    moduleId: module.id,
    selector: 'basic-form-mux',
    template: `
    <template #muxContent></template>
    <template #muxContentB></template>
    <button class='btn btn-primary' (click)=' toggle = !toggle'>Toggle</button>
    <template [myUnless]='toggle'><h3>ViewContainerRef CreateEmbeddedView Test</h3></template>
    
    
    `,
    directives: [UnlessDirective] // PortalHostDirective, TemplatePortalDirective
})
// <template [portalHost]="dynamicComponentPortal"></template>

export class BasicFormMux implements OnInit {
    @Input('template') template: string;
    @ViewChild('muxContent', { read: ViewContainerRef }) contentTarget: ViewContainerRef;
    @ViewChild('muxContentB', { read: ViewContainerRef }) contentTargetB: ViewContainerRef;
    // @ViewChild(MdDialogPortal) private portal: MdDialogPortal;
    //@ViewChild('muxContentC', { read: TemplateRef }) contentTargetC: TemplateRef;<p *myUnless = "toggle">ContentChild</p>

    toggle: boolean = false;
    dynamicComponentPortal;
    constructor(private componentResolver: ComponentResolver, private componentFactoryResolver: ComponentFactoryResolver) {
        // this.dynamicComponentPortal = new ComponentPortal(DynamicComponent);
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
            selector: 'dynamic-component-load-html2',
            template: template,
            directives: [ROUTER_DIRECTIVES, CORE_DIRECTIVES, FORM_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
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


@Component({
    moduleId: module.id,
    directives: [CORE_DIRECTIVES, FORM_DIRECTIVES],
    precompile: [],
    selector: 'test',
    templateUrl: `./test.html`
})
export class DynamicComponent {
    constructor(private router: Router) { }
    signup(username: string, password: string, avatar: string): void {
        console.log('signup');
    }

    login(event: any) {
        this.router.navigateByUrl('/login');

    }
}

