import {Injectable} from '@angular/core'
import {Subject}    from 'rxjs/Subject';
import {IEventArgs} from './container/base';
import {isType, isString, isBlank, isArray} from "@angular/common/src/facade/lang";

@Injectable()
export class EventBus {
    private _globalEvent = new Subject<IEventArgs>();
    private _eventBusStream$ = this._globalEvent.asObservable();

    private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

    constructor() {
        this._eventBusStream$.subscribe((eventArgs) => this._onEvent(eventArgs));
    }

    post(eventArgs: IEventArgs): this {

        let current = this._globalEvent[eventArgs.type];
        if (current != eventArgs) {
            this._globalEvent[eventArgs.type] = eventArgs;

            this._globalEvent.next(eventArgs);
        }
        return this;
    }


    subscribe(event: string | Array<string>, actionHandler: Function): this {
        if (isString(event)) {
            let subscribers = this._subscriptions.get(event) || [];
            subscribers.push(actionHandler);
            this._subscriptions.set(event, subscribers);
        }
        if (isArray(event)) {
            let events = <Array<string>>event;
            events.forEach(e => {
                let subscribers = this._subscriptions.get(e) || [];
                subscribers.push(actionHandler);
                this._subscriptions.set(e, subscribers);
            });
        }
        return this;
    }

    unSubscribe(event: string | Array<string>, actionHandler: Function): this {
        if (isString(event)) {
            let subscribers = this._subscriptions.get(event) || [];
            subscribers = subscribers.filter((cb) => cb != actionHandler);
            this._subscriptions.set(event, subscribers);
        }
        if (isArray(event)) {
            let events = <Array<string>>event;
            events.forEach(e => {
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

    private _onEvent(eventArgs: IEventArgs) {
        let subscribers = this._subscriptions.get(eventArgs.type) || [];

        subscribers.forEach((callback) => {
            callback.call(null, eventArgs);
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