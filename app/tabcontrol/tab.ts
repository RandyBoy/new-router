import { Component, Input } from '@angular/core';
@Component({
    selector: 'tab',
    inputs: ['title'],
    template: `
 <div class="ui bottom attached tab segment"
 [class.active]="active">

 <ng-content></ng-content>

 </div>
 `
})
export class Tab {
    @Input('title') title: string;
    active: boolean = false;
    name: string;
}