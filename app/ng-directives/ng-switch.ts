import { Component } from '@angular/core';
import { NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';

@Component({
    selector: 'app',
    template: `
      <p>Value = {{value}}</p>
      <button (click)="inc()">Increment</button>
 
      <div [ngSwitch]="value">
        <p *ngSwitchCase="'init'">increment to start</p>
        <p *ngSwitchCase="0">0, increment again</p>
        <p *ngSwitchCase="1">1, increment again</p>
        <p *ngSwitchCase="2">2, stop incrementing</p>
        <p *ngSwitchDefault>&gt; 2, STOP!</p>
      </div>
 
      <!-- alternate syntax -->
 
      <p [ngSwitch]="value">
        <template ngSwitchCase="init">increment to start</template>
        <template [ngSwitchCase]="0">0, increment again</template>
        <template [ngSwitchCase]="1">1, increment again</template>
        <template [ngSwitchCase]="2">2, stop incrementing</template>
        <template ngSwitchDefault>&gt; 2, STOP!</template>
      </p>
    `,
    directives: [NgSwitch, NgSwitchCase, NgSwitchDefault]
})
export class App {
    value: any = 'init';
    inc() {
        this.value = this.value === 'init' ? 0 : this.value + 1;
    }
}
