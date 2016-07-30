import {Injectable} from '@angular/core'
import {Subject}    from 'rxjs/Subject';
import {IAction} from './container/base';

@Injectable()
export class GlobalEventDispatcher {
    private _globalEvent = new Subject<IAction>();
    private _globalEventStream$ = this._globalEvent.asObservable();

    private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

    constructor() {
        this._globalEventStream$.subscribe((eventArgs) => this._onEvent(eventArgs));
    }

    notify(eventArgs: IAction): this {

        let current = this._globalEvent[eventArgs.type];
        if (current != eventArgs) {
            this._globalEvent[eventArgs.type] = eventArgs;

            this._globalEvent.next(eventArgs);
        }
        return this;
    }

    subscribe(event: string, actionHandler: Function): this {
        let subscribers = this._subscriptions.get(event) || [];
        subscribers.push(actionHandler);

        this._subscriptions.set(event, subscribers);
        return this;
    }

    unSubscribe(event: string, actionHandler: Function): this {
        let subscribers = this._subscriptions.get(event) || [];
        subscribers = subscribers.filter((cb) => cb != actionHandler);
        // let idx = subscribers.indexOf(callback);
        // if (idx > -1) {
        //     delete subscribers[idx];
        // }
        this._subscriptions.set(event, subscribers);
        return this;
    }

    private _onEvent(eventArgs: IAction) {
        let subscribers = this._subscriptions.get(eventArgs.type) || [];

        subscribers.forEach((callback) => { 
            callback.call(null, eventArgs);
        });
    }
}