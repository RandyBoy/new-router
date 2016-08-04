import {Injectable} from '@angular/core'
import {Subject}    from 'rxjs/Subject';
import {IAction} from './base';
import {isType, isString, isBlank, isArray} from "@angular/common/src/facade/lang";

@Injectable()
export class StoreCenter {
    private isDispatching: boolean;
    private _stateStore = new Subject<IAction>();

    private _stateStoreStream$ = this._stateStore.asObservable();

    private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

    constructor() {
        this._stateStoreStream$.subscribe((action) => {
            this.reducer(action);
        });
    }

    dispatch(action: IAction): this {
        if (typeof action.type === 'undefined') {
            throw new Error(
                'Actions may not have an undefined "type" property.'
            )
        }
        if (this.isDispatching) {
            throw new Error('Reducers may not dispatch actions.')
        }
        try {
            this.isDispatching = true;
            let current = this._stateStore[action.type];
            if (current != action) {
                this._stateStore[action.type] = action;
                this._stateStore.next(action);
            }
            // currentState = currentReducer(currentState, action)
        } finally {
            this.isDispatching = false;
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

    private reducer(action: IAction) {
        let subscribers = this._subscriptions.get(action.type) || this._subscriptions.get('global') || [];
        subscribers.forEach((callback) => {
            callback.call(null, action);
        });
    }
}
