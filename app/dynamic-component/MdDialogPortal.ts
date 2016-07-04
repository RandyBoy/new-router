import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
import { TemplatePortalDirective, PortalHostDirective } from '../core/portal/portal-directives';
import { ComponentPortal, TemplatePortal } from '../core/portal/portal';

@Directive({ selector: '[mdDialogPortal]' })
export class MdDialogPortal extends TemplatePortalDirective {
    constructor(templateRef: TemplateRef<any>, viewContainerRef: ViewContainerRef) {
        super(templateRef, viewContainerRef);
    }
}