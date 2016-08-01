import {IAction} from '../container/Base';
import * as WbEventType from './wbEventType';

export function wbReducer(state: any, action: IAction) {
    if (this.name === action.playload.wbid) {
        if (action.type === WbEventType.AddComment) {
            this.addComment(action.playload.msg);
        } else if (action.type === WbEventType.DelComment) {
            this.delComment(action.playload.msg);
        }
    }
}