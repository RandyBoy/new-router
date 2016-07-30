import {Injectable} from '@angular/core'
import {Subject}    from 'rxjs/Subject';
import {IAction} from './container/base';

@Injectable()
export class GlobalEventDispatcher {
    private onMessageConst: string = "onMessage";
    private _data = new Subject<IAction>();
    private _dataStream$ = this._data.asObservable();

    private _subscriptions: Map<string, Array<Function>> = new Map<string, Array<Function>>();

    constructor() {
        this._dataStream$.subscribe((data) => this._onEvent(data));
    }

    notifyDataChanged(eventArgs: IAction): this {

        let current = this._data[eventArgs.type];
        if (current != eventArgs) {
            this._data[eventArgs.type] = eventArgs;

            this._data.next(eventArgs);
        }
        return this;
    }

    subscribe(event: string, callback: Function): this {
        let subscribers = this._subscriptions.get(event) || [];
        subscribers.push(callback);

        this._subscriptions.set(event, subscribers);
        return this;
    }

    unSubscribe(event: string, callback: Function): this {
        let subscribers = this._subscriptions.get(event) || [];
        subscribers = subscribers.filter((cb) => cb != callback);
        // let idx = subscribers.indexOf(callback);
        // if (idx > -1) {
        //     delete subscribers[idx];
        // }
        //  event.callbacks = event.callbacks.filter(function (cb) {
        //         return cb != callback;
        //     });
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