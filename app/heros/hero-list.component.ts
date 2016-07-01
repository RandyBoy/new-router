// TODO SOMEDAY: Feature Componetized like CrisisCenter
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute, ROUTER_DIRECTIVES} from '@angular/router';

import { Hero, HeroService }   from './hero.service';

@Component({
    template: `
    <h2>HEROES</h2>
    <ul class="items">
      <li *ngFor="let hero of heroes"
        [class.selected]="isSelected(hero)"
        (click)="onSelect(hero)">
        <span class="badge">{{hero.id}}</span> {{hero.name}}
      </li>
    </ul>
   list:<router-outlet></router-outlet>
  `,
    directives: [ROUTER_DIRECTIVES]
})
export class HeroListComponent implements OnInit, OnDestroy {
    heroes: Hero[];

    private selectedId: number;
    private sub: any;

    constructor(
        private service: HeroService,
        private router: Router,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.sub = this.router
            .routerState
            .queryParams
            .subscribe(params => {
                this.selectedId = +params['id'];
                this.service.getHeroes()
                    .then(heroes => this.heroes = heroes);
            });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    isSelected(hero: Hero) { return hero.id === this.selectedId; }

    onSelect(hero: Hero) {
        this.router.navigate(['../', 'hero', hero.id], { relativeTo: this.route });
    }

}