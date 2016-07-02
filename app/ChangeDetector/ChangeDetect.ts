import { Component, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
    selector: 'ChangeDetectcmp',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `Number of ticks: {{numberOfTicks}}`
})
class ChangeDetectCmp {
    numberOfTicks = 0;
    constructor(private ref: ChangeDetectorRef) {
        setInterval(() => {
            this.numberOfTicks++
            this.ref.markForCheck();
        }, 1000);
    }
}

@Component({
    selector: 'ChangeDetectApp',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <ChangeDetectcmp></ChangeDetectcmp>
        <giant-list>aaa</giant-list>
      `,
    directives: [ChangeDetectCmp]
})
export class ChangeDetectApp {

}

@Component({
    selector: 'giant-list',
    template: `
        <li *ngFor="let d of dataProvider.data">Data {{d}}</li>
      `,
    directives: [NgFor],
    providers: [DataProvider]
})
class GiantList {
    constructor(private ref: ChangeDetectorRef, private dataProvider: DataProvider) {
        console.log(dataProvider);
        ref.detach();
        setInterval(() => {
            this.ref.detectChanges();
        }, 5000);
    }
}

export class DataProvider {
    // in a real application the returned data will be different every time
    get data() {
        return [1, 2, 3, 4, 5];
    }
}

class DynamicComponent {
}

const dynamicComponent = Component({
    selector: 'dynamic-component',
    template: `<p>Dynamic Component</p>`
})(DynamicComponent);