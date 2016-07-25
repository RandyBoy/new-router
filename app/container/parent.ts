import {provide, forwardRef} from "@angular/core";
export abstract class Parent {
    name: string;
    childs: Parent[] = [];
    /**
     *
     */
    constructor(public parent: Parent) {


    }
    attach() {
        if (this.parent) {
            this.parent.childs.push(this);
        }

    }
    dettach() {
        if (this.parent) {
            let idx = this.parent.childs.indexOf(this);
            if (idx > -1) {
                this.parent.childs.splice(idx, 1);
            }
        }

    }

}

export const provideParent = (component: any, parentType?: any) => provide(parentType || Parent, { useExisting: forwardRef(() => component) });

export const provideTheParent = (component: any) => provide(Parent, { useExisting: forwardRef(() => component) });