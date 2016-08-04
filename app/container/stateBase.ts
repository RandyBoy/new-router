
import {IAction} from './base';
import {isFunction} from "@angular/common/src/facade/lang";
export abstract class StateBase {
    //actions: Map<string, Array<Function>> = new Map<string, Array<Function>>();
    /**
     *
     */
    constructor() {

    }

    reducer(action: IAction) {
        // let result = null;
        // let subscribers = this.actions.get(action.type) || [];
        // subscribers.forEach((callback) => {
        //     result = callback.call(null, action);
        // });
        if (isFunction(this[action.type])) {
            return this[action.type].call(this, action.playload);
        }
        if (this.hasOwnProperty(action.type)) {
            return this[action.type];
        }
    }
    //     /**
    //    * 调用方法
    //    */
    //     callMethod(method: string, params?: any[]) {
    //         return this[method] ? this[method].call(this, params) : null;
    //     }
    //     /**
    //      * 获取属性
    //      */
    //     getProperty(propertyName: string) {
    //         return this.hasOwnProperty(propertyName) ? this[propertyName] : null;
    //     }
}