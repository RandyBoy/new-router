import {provide, forwardRef, Optional, SkipSelf, Type} from "@angular/core";
import {isType, isString, isBlank, isArray} from "@angular/common/src/facade/lang";
import uuid from '../utils/uuid';
import {Subject} from 'rxjs/rx';

export interface IAction {
    target?: Base[] | string | Type,
    type: string;
    playload: any
}

export const CallMethod = 'callMethod';
export const CallProp = 'callProp';

export abstract class Base {

    dispatcherStream: Subject<IAction>;
    componentMap: { [key: string]: Base };
    root: Base = null;
    ancestor: Base = null;
    name: string = uuid();
    childs: Base[] = [];
    constructor( @SkipSelf() @Optional() public parent: Base) {
        this.dispatcherStream = new Subject<IAction>();
        this.dispatcherStream.subscribe(action => {
            this.dispatchAction(action);
        });
    }

    attach() {
        if (this.parent) {
            this.root = this.parent.root;
            this.ancestor = this.parent.ancestor;
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

    notify(action: IAction, targetComp?: Base[] | string | Type) {
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

    getCompTree() {
        let expand = (comp: Base): Map<string, Base> => {
            let dict: Map<string, Base> = new Map<string, Base>();
            dict[comp.name] = comp;
            comp.childs.forEach(c => {
                dict = Object.assign(dict, expand(c));
            });
            return dict;
        }
        return expand(this);
    }

    getComponentTree() {
        let expand = (comp: Base): { [key: string]: Base } => {
            let dict: { [key: string]: Base } = {};
            dict[comp.name] = comp;
            comp.childs.forEach(node => {
                dict = Object.assign(dict, expand(node));
            });
            return dict;
        }
        return this.componentMap = expand(this);
    }

    expand(comp: Base, callback: (comp: Base) => void) {
        callback(comp);
        comp.childs.forEach(c => {
            this.expand(c, callback);
        });
    }

    setRoot() {
        return this.expand(this, (comp) => { comp.root = this });
    }
    setAncestor() {
        return this.expand(this, (comp) => { comp.ancestor = this });
    }

    findChildComp(comp: string | Type, startComp: Base): Base {
        let result: Base = null;
        if (isString(comp)) {
            if (startComp.name === comp) {
                return result = startComp;
            }
        } else if (isType(comp)) {
            if (startComp instanceof comp) {
                return result = startComp;
            }
        }
        startComp.childs.forEach(child => {
            if (isString(comp)) {
                if (child.name === comp) {
                    return result = child;
                }
            } else if (isType(comp)) {
                if (child instanceof comp) return result = child;
            }
        });
        startComp.childs.forEach(element => {
            result = this.findChildComp(comp, element);
            if (result) return result;
        });
        return result;
    }

    findComponent<T extends Base>(comp: string): T {
        let key: string = <string>comp;
        let findComp = this.getCompTree()[key];
        return findComp ? findComp as T : null;
    }

    findComp(comp: string | Type, startComp: Base): Base {
        let result: Base = null;
        if (isString(comp)) {
            if (startComp.name === comp) {
                return result = startComp;
            }
        } else if (isType(comp)) {
            if (startComp instanceof comp) {
                return result = startComp;
            }
        }

        if (startComp.parent) {
            startComp.parent.childs.forEach(child => {
                if (isString(comp)) {
                    if (child.name === comp) {
                        return result = child;
                    }
                } else if (isType(comp)) {
                    if (child instanceof comp) return result = child;
                }
            });
            result = this.findComp(comp, startComp.parent);
            if (result) return result;
        }
        return result;
    }

    getComp<T extends Base>(comp: string | Type, startNode: Base): T {
        return this.findComp(comp, startNode) as T;
    }

    findComponentList(type: Type, first?: boolean): Base | Base[] {
        let typeList = new Array<Base>();
        let object = this.getCompTree();
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
    request(action: IAction, targetComp?: Base[] | string | Type) {
        if (isString(targetComp)) {
            let findComp = this.findComp(targetComp, this) || this.getComponent(targetComp);
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

export const provideParent = (component: any, parentType?: any) => provide(parentType || Base, { useExisting: forwardRef(() => component) });

export const provideTheParent = (component: any) => provide(Base, { useExisting: forwardRef(() => component) });