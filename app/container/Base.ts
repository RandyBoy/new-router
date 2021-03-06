import {provide, forwardRef, Optional, SkipSelf, Type, ReflectiveInjector} from "@angular/core";
import {isType, isString, isBlank, isArray, isFunction} from "@angular/common/src/facade/lang";
import uuid from '../utils/uuid';
import {Subject} from 'rxjs/rx';
import {EventBus} from '../EventBus';
import {StoreCenter} from './StoreCenter';
import {StateBase} from './stateBase';

export interface IAction {
    sender?: any;
    target?: any;
    type: string;
    playload: any;
}

export const CallMethod = 'onCallMethod';
export const CallProp = 'onCallProp';

export abstract class Base {

    dispatcherStream: Subject<IAction> = new Subject<IAction>();
    componentMap: Map<string, Base> = new Map<string, Base>();
    root: Base = null;
    context: Base = null;
    name: string = uuid();
    childs: Base[] = [];
    storeCenter: StoreCenter = new StoreCenter();
    // private stateBase: StateBase;
    eventBus: EventBus; //只有祖先组件才分配值，其它组件可以直接访问
    constructor( @SkipSelf() @Optional() public parent: Base) {
        this.dispatcherStream
            .subscribe(action => { // && (msg.sender != this || msg.sender.name != this.name)      //msg => (msg.target.name === this.name || msg.target === this))
                this.reducer(action);
            });
    }
    /**
     * 附加组件到父组件
     */
    attach() {
        if (this.parent) {
            this.root = this.parent.root;
            this.context = this.parent.context;
            this.parent.childs.push(this);
            if (this.root) {
                this.root.componentMap.set(this.name, this);
            }
        }
    }

    /**
     * 从父组件移除组件
     */
    dettach() {
        if (this.parent) {
            let idx = this.parent.childs.indexOf(this);
            if (idx > -1) {
                this.parent.childs.splice(idx, 1);
            }

            if (this.root && this.root.componentMap.has(this.name)) {
                this.root.componentMap.delete(this.name);
            }
        }
    }
    // regFun = (actionArgs) => { this.dispatcherStream.next(actionArgs) };
    /**
     * 向目标组件发送一个通知
     */
    notify(action: IAction, targetComp?: Base[] | string | Type) {
        if (isBlank(targetComp)) {
            let compMap = this.getComponentTree();
            for (let key in compMap) {
                let target = compMap[key];
                target.dispatcherStream.next(action);
            }
        }
        if (isString(targetComp)) {
            let comps = this.getComponentTree();
            let target = comps[targetComp]; //this.findChildComp(targetComp, this); 
            let act = action;
            act.target = target;
            target ? target.dispatcherStream.next(act) : null;
        }
    }

    /**
     * 组件本身的默认通知处理函数，子类可覆写或调用
     */
    reducer(action: IAction) {
        if (this['stateBase']) {
            this['stateBase'].reducer(action);
        }
        switch (action.type) {
            case CallMethod:
                return this.callMethod(action.playload.method, action.playload.params);
            case CallProp:
                return this.getProperty(action.playload.prop);
            default:
                break;
        }
    }
    bindActionCreator(actionCreator, dispatch) {
        return (...args) => dispatch(actionCreator(...args))
    }
    /**
     * 从组件的上下文分发动作消息
     */
    dispatch(actionCreator: IAction, extra?: { context?: Base, dispatchAll?: boolean }) {

        let dispatchAll = false;
        let context: Base = this;
        if (extra) {
            if (extra.dispatchAll) {
                dispatchAll = true;
            }
            if (extra.context) {
                context = extra.context;
            }
        }
        context.eventBus.dispatch(actionCreator, dispatchAll);
    }

    bindActionCreators(actionCreators, dispatch) {
        if (typeof actionCreators === 'function') {
            return this.bindActionCreator(actionCreators, dispatch)
        }

        if (typeof actionCreators !== 'object' || actionCreators === null) {
            throw new Error(
                `bindActionCreators expected an object or a function, instead received ${actionCreators === null ? 'null' : typeof actionCreators}. ` +
                `Did you write "import ActionCreators from" instead of "import * as ActionCreators from"?`
            )
        }

        let keys = Object.keys(actionCreators);
        let boundActionCreators = {}
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i]
            let actionCreator = actionCreators[key]
            if (typeof actionCreator === 'function') {
                boundActionCreators[key] = this.bindActionCreator(actionCreator, dispatch);
            }
        }
        return boundActionCreators
    }
    // /**
    //  * 全局默认通知处理函数，子类可覆写或调用,废弃
    //  */
    // eventBusHandler(eventArgs: IAction) {
    //     switch (eventArgs.type) {
    //         case CallMethod:
    //             return this.callMethod(eventArgs.playload.method, eventArgs.playload.params);
    //         // break;
    //         case CallProp:
    //             return this.getProperty(eventArgs.playload.prop);

    //         default:
    //             break;
    //     }
    // }

    regFun = (actionArgs) => this.dispatcherStream.next(actionArgs); // this.eventBusHandler(eventArgs)
    /**
     * 组件类的默认ngOnInit生命周期
     */
    ngOnInit() {
        this.attach();
        if (this.context && this.context.eventBus) {
            this.context.eventBus.subscribe(['onMessage', 'onCallMethod', 'onCallProp'], this.regFun);
        }
        if (this.root && this.root.eventBus) {
            this.root.eventBus.subscribe(['onMessage', 'onCallMethod', 'onCallProp'], this.regFun);
        }
        if (this.eventBus) {
            this.eventBus.subscribe(['onMessage', 'onCallMethod', 'onCallProp'], this.regFun);
        }

    }
    /**
     * 基类的默认ngOnDestroy生命周期
     */
    ngOnDestroy() {
        this.dettach();
        if (this.context && this.context.eventBus) {
            this.context.eventBus.unSubscribe(['onMessage', 'onCallMethod', 'onCallProp'], this.regFun);
        }
        if (this.root && this.root.eventBus) {
            this.root.eventBus.unSubscribe(['onMessage', 'onCallMethod', 'onCallProp'], this.regFun);
        }
        if (this.eventBus) {
            this.eventBus.unSubscribe(['onMessage', 'onCallMethod', 'onCallProp'], this.regFun);
        }

    }
    /**
     * 获取组件树
     */
    getComponentTree() {
        let expand = (comp: Base): { [key: string]: Base } => {
            let dict: { [key: string]: Base } = {};
            dict[comp.name] = comp;
            comp.childs.forEach(node => {
                dict = Object.assign(dict, expand(node));
            });
            return dict;
        }
        return expand(this);
    }
    /**
     * 递归方式展开对象，并执行相尖的回调函数
     */
    expand(comp: Base, callback: (comp: Base) => void) {
        callback(comp);
        comp.childs.forEach(c => {
            this.expand(c, callback);
        });
    }
    /**
     * 设置组件的根组件
     */
    setRoot() {
        return this.expand(this, (comp) => {
            comp.root = this;
            this.root.componentMap.set(this.name, this);
        });
    }
    /**
     * 设置组件的祖先
     */
    setContext() {
        return this.expand(this, (comp) => { comp.context = this; });
    }
    /**
     * 从指定的组件开始向下寻找目标组件
     */
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
        let findComp = this.getComponentTree()[key];
        return findComp ? findComp as T : null;
    }
    /**
     * 根据指定的条件向上查找组件
     */
    searchUp(startComp: Base, predicate: (comp: Base) => boolean): Base {
        let result: Base = null;
        if (predicate(startComp)) {
            return result = startComp;
        }
        result = this.searchUp(startComp.parent, predicate);
        if (result) return result;
        return result;
    }
    searchDown(startComp: Base, predicate: (comp: Base) => boolean): Base {
        let result: Base = null;
        result = predicate(startComp) ? startComp : null || startComp.childs.filter(predicate)[0];
        if (result) return result;
        startComp.childs.forEach(element => {
            element.childs.forEach(element => {
                result = this.searchDown(element, predicate);
                if (result) return result;
            });
        });
        return result;
    }

    /**
     * 从指定的部件开始往上寻找目标组件
     */
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

    /**
     * 调用方法
     */
    callMethod(method: string, params?: any[]) {
        return this[method] ? this[method].call(this, params) : null;
    }
    /**
     * 获取属性
     */
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

    /**
     * 
     */
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