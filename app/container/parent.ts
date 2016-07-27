import {provide, forwardRef, Optional, SkipSelf, Type} from "@angular/core";
import {isType, isString, isBlank, isArray} from "@angular/common/src/facade/lang";
import uuid from '../utils/uuid';
import {Subject} from 'rxjs/rx';

export interface IAction {
    target?: Parent[] | string | Type,
    type: string;
    playload: any
}

export const CallMethod = 'callMethod';
export const CallProp = 'callProp';

export abstract class Parent {

    dispatcherStream: Subject<IAction>;
    componentMap: { [key: string]: Parent };
    root: Parent = null;
    name: string = uuid();
    childs: Parent[] = [];
    constructor( @SkipSelf() @Optional() public parent: Parent) {
        this.dispatcherStream = new Subject<IAction>();
        this.dispatcherStream.subscribe(action => {
            this.dispatchAction(action);
        });
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

    notify(action: IAction, targetComp?: Parent[] | string | Type) {
        if (isBlank(targetComp)) {
            let object = this.getComponentTree();
            for (let key in object) {
                let target = object[key];
                target.dispatcherStream.next(action);
            }
        }
        if (isString(targetComp)) {
            let object = this.getComponentTree();
            let target = object[targetComp];
            target ? target.dispatcherStream.next(action) : null;
        }
    }

    dispatchAction(action: IAction) {
        if (action.type === CallMethod) {
            return this.callMethod(action.playload.method, action.playload.params);
        }
        if (action.type === CallProp) {
            return this.getProperty(action.playload.prop);
        }
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
        return this.hasOwnProperty(method) ? this[method].call(this, params) : null;
    }

    getProperty(propertyName: string) {
        return this.hasOwnProperty(propertyName) ? this[propertyName] : null;
    }

    request3(req: { comp: string, method?: string, properyName?: string, params?: any[] }) {
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
    request(action: IAction, targetComp?: Parent[] | string | Type) {
        if (isString(targetComp)) {
            let findComp = this.getComponent(targetComp);
            if (action.type === CallMethod) {
                return findComp.callMethod(action.playload.method, action.playload.params);
            }
            if (action.type === CallProp) {
                return findComp.getProperty(action.playload.prop);
            }
        }
        return null;
    }
}

export const provideParent = (component: any, parentType?: any) => provide(parentType || Parent, { useExisting: forwardRef(() => component) });

export const provideTheParent = (component: any) => provide(Parent, { useExisting: forwardRef(() => component) });