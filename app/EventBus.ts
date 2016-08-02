import {Injectable} from '@angular/core'
import {Subject}    from 'rxjs/Subject';
import {IAction} from './container/base';
import {isType, isString, isBlank, isArray} from "@angular/common/src/facade/lang";

@Injectable()
export class EventBus {
    private isDispatching: boolean;
    private _globalEvent = new Subject<IAction>();
    //  private _store = new Subject<IAction>();

    private _eventBusStream$ = this._globalEvent.asObservable();

    private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

    constructor() {
        this._eventBusStream$.subscribe((action) => {
            this._onEvent(action);
        });
    }

    dispatch(action: IAction, dispatchAll?: boolean): this {
        if (typeof action.type === 'undefined') {
            throw new Error(
                'Actions may not have an undefined "type" property.'
            )
        }
        // if (this.isDispatching) {
        //     throw new Error('Reducers may not dispatch actions.')
        // }
        // try {
        //     this.isDispatching = true
        //     // currentState = currentReducer(currentState, action)
        // } finally {
        //     this.isDispatching = false
        // }
        let current = this._globalEvent[action.type];
        if (current != action) {
            this._globalEvent[action.type] = action;
            this._globalEvent.next(action);
        }
        return this;
    }

    subscribe(action: string | Array<string>, listener: Function) {
        if (isString(action)) {
            let subscribers = this._subscriptions.get(action) || [];
            subscribers.push(listener);
            this._subscriptions.set(action, subscribers);
        }
        if (isArray(action)) {
            let actions = <Array<string>>action;
            actions.forEach(act => {
                let subscribers = this._subscriptions.get(act) || [];
                subscribers.push(listener);
                this._subscriptions.set(act, subscribers);
            });
        }
        return () => {
            if (isString(action)) {
                let subscribers = this._subscriptions.get(action) || [];
                subscribers = subscribers.filter((cb) => cb != listener);
                this._subscriptions.set(action, subscribers);
            }
            if (isArray(action)) {
                let actions = <Array<string>>action;
                actions.forEach(e => {
                    let subscribers = this._subscriptions.get(e) || [];
                    subscribers = subscribers.filter((cb) => cb != listener);
                    this._subscriptions.set(e, subscribers);
                });
            }
        };
    }

    unSubscribe(action: string | Array<string>, actionHandler: Function): this {
        if (isString(action)) {
            let subscribers = this._subscriptions.get(action) || [];
            subscribers = subscribers.filter((cb) => cb != actionHandler);
            this._subscriptions.set(action, subscribers);
        }
        if (isArray(action)) {
            let actions = <Array<string>>action;
            actions.forEach(e => {
                // let subscribers = this._subscriptions.get(e) || [];
                // subscribers.push(actionHandler);
                // this._subscriptions.set(e, subscribers);
                let subscribers = this._subscriptions.get(e) || [];
                subscribers = subscribers.filter((cb) => cb != actionHandler);
                this._subscriptions.set(e, subscribers);
            });
        }
        return this;
    }

    private _onEvent(action: IAction) {
        let subscribers = this._subscriptions.get(action.type) || this._subscriptions.get('onMessage') || [];
        subscribers.forEach((callback) => {
            callback.call(null, action);
        });
    }

    // subscribe2(listener) {

    //     listeners.push(listener);

    //     return function unsubscribe() {

    //         var index = listeners.indexOf(listener);

    //         listeners.splice(index, 1);

    //     };
    // }
    //store.dispatch(action) 
    // store.subscribe(listener)
}

export function editTodo(id, text) {
    return { type: "EDIT_TODO", id, text }
}

function bindActionCreator(actionCreator, dispatch) {
    return (...args) => dispatch(actionCreator(...args))
}