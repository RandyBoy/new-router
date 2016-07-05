// TODO SOMEDAY: Feature Componetized like CrisisCenter
import { Component, OnInit, OnDestroy, ViewChild, ComponentResolver} from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';

import { Hero, HeroService }   from './hero.service';
import { MdDialogPortal } from '../dynamic-components/MdDialogPortal';
import { ComponentPortal, TemplatePortal } from '../core/portal/portal';
import { PortalHostDirective, TemplatePortalDirective } from '../core/portal/portal-directives';
import { DynamicComponent } from '../dynamic-components/DynamicComponent';
import { DomPortalHost } from '../core/portal/dom-portal-host';
import { createOverlayContainer } from '../core/overlay/overlay-container';

@Component({
    moduleId: module.id,
    template: `
    <h2>HEROES</h2>
    <ul class="items">
      <li *ngFor="let hero of heroes"
        [class.selected]="isSelected(hero)"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
    <template mdDialogPortal>
         <p>The content of this template is captured by the portal.</p>
         <p>动态创建模板视图</p>
     </template>
     <template [portalHost]="dynamicComponentPortal"></template>
   <router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES, MdDialogPortal, PortalHostDirective]
})
export class HeroListComponent implements OnInit, OnDestroy {
    heroes: Hero[];

    private selectedId: number;
    private sub: any;

    constructor(
        private service: HeroService,
        private router: Router,
        private route: ActivatedRoute,
        private componentResolver: ComponentResolver
    ) { }
    _overlayContainerElement: Element;
    dynamicComponentPortal: ComponentPortal;
    @ViewChild(MdDialogPortal) private portal: MdDialogPortal;
    ngOnInit() {
        this.sub = this.router
            .routerState
            .queryParams
            .subscribe(params => {
                this.selectedId = +params['id'];
                this.service.getHeroes()
                    .then(heroes => this.heroes = heroes);
            });
        this._overlayContainerElement = createOverlayContainer();
        this.dynamicComponentPortal = new ComponentPortal(DynamicComponent);
        this._createPaneElement()
            .then(panel => this._createPortalHost(panel))
            .then(portalHost => {
                // // portalHost.attach(this.portal);
                // this.dynamicComponentPortal.viewContainerRef = this.portal.viewContainerRef;
                // portalHost.attach(this.dynamicComponentPortal);
            });
    }
    nextUniqueId: number = 0;
    private _createPaneElement(): Promise<HTMLElement> {
        var pane = document.createElement('div');
        pane.id = `md-overlay-${this.nextUniqueId++}`;
        pane.classList.add('md-overlay-pane');
        this._overlayContainerElement.appendChild(pane);
        return Promise.resolve(pane);
    }

    private _createPortalHost(pane: HTMLElement): DomPortalHost {
        return new DomPortalHost(pane, this.componentResolver);
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    isSelected(hero: Hero) { return hero.id === this.selectedId; }

    onSelect(hero: Hero) {
        this.router.navigate(['../', 'hero', hero.id], { relativeTo: this.route });
    }

}