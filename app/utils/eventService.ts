import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/rx';

export interface Message {
    target?: any;
    type?: string;
    playload?: {
        callback: Function,
        params: any[]
    };
}

@Injectable()
export class EventService {
    eventDispatcher: BehaviorSubject<Message>;
    constructor() {
        this.eventDispatcher = new BehaviorSubject<Message>({});
    }
    emit(msg: Message) {
        this.eventDispatcher.next(msg);
    }
    subscribe(callback: (value: Message) => void) {
        return this.eventDispatcher.subscribe(callback);
    }
}