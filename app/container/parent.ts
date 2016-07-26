import {provide, forwardRef, Optional, SkipSelf, Type} from "@angular/core";
import {isType} from "@angular/common/src/facade/lang";
import uuid from '../utils/uuid';
import {BehaviorSubject} from 'rxjs/rx';

export abstract class Parent {

    notifyStream: BehaviorSubject<{ type: string, playload: any }>;
    componentMap: { [key: string]: Parent };
    root: Parent = null;
    name: string = uuid();
    childs: Parent[] = [];
    constructor( @SkipSelf() @Optional() public parent: Parent) {
        // this.root = this.parent ? this.parent.root : null;
        this.notifyStream = new BehaviorSubject<any>({ type: '', playload: null });
        this.notifyStream.subscribe(res => console.log(this.name + '接收到了通知,并且回应了消息.'));
    }

    attach() {
        if (this.parent) {
            this.root = this.parent.root;
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

    notify() {
        let object = this.getComponentTree();
        for (var key in object) {
            if (object.hasOwnProperty(key)) {
                let target = object[key];
                target.notifyStream.next({ type: 'abc', playload: null });
            }
        }
    }

    update() {

    }

    ngOnInit() {
        this.attach();
    }

    ngOnDestroy() {
        this.dettach();
    }

    getComponentTree() {
        let expand = (nodeObj: Parent): { [key: string]: Parent } => {
            let dict: { [key: string]: Parent } = {};
            nodeObj.root = this;
            dict[nodeObj.name] = nodeObj;
            nodeObj.childs.forEach(node => {
                dict = Object.assign(dict, expand(node));
            });
            return dict;
        }
        return this.componentMap = expand(this);
    }

    findComponent<T extends Parent>(comp: string): T {
        let key: string = <string>comp;
        let findComp = this.getComponentTree()[key];
        return findComp ? findComp as T : null;
    }

    findComponentList(type: Type, first?: boolean): Parent | Parent[] {
        let typeList = new Array<Parent>();
        let object = this.getComponentTree();
        for (let key in object) {
            let element = object[key];
            if (element instanceof type) {
                if (first) { return element; }
                typeList.push(element);
            }
        }
        return typeList;
    }
    getComponent(compKey: string) {
        let findComp = this.getComponentTree()[compKey];
        return findComp ? findComp : null;
    }

    callMethod(method: string, params?: any[]) {
        return this[method].call(this, params);
    }

    getProperty(properyName: string) {
        return this[properyName];
    }

    request(req: { comp: string, method?: string, properyName?: string, params?: any[] }) {
        let findComp = this.getComponent(req.comp);
        if (findComp) {
            if (req.method) {
                return findComp.callMethod(req.method, req.params);
            }
            if (req.properyName) {
                return findComp.getProperty(req.properyName);
            }
        }
        return null;
    }
}

export const provideParent = (component: any, parentType?: any) => provide(parentType || Parent, { useExisting: forwardRef(() => component) });

export const provideTheParent = (component: any) => provide(Parent, { useExisting: forwardRef(() => component) });