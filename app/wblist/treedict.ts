import { Injectable } from '@angular/core';

@Injectable()
export class TreeDictService {
    root: CompNode<any>;
    constructor() {

    }

}

export class CompNode<T> {

    childs: CompNode<any>[];

    constructor(name: string, comp: T) {

    }
    attach(comp: any) {
        this.childs.push(comp);
    }
    dettach(comp: any) {
        let idx = this.childs.indexOf(comp);
        if (idx > -1) {
            this.childs.splice(idx, 1);
        }
    }
}
