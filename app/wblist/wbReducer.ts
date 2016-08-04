import {IAction} from '../container/Base';
import * as WbEventType from './wbEventType';
import {wbState} from './wbState';

export function wbReducer(state: wbState, action: IAction) {
    switch (action.type) {
        case WbEventType.AddComment:
            return state.addComment(action.playload.msg);
        case WbEventType.DelComment:
            return state.delComment(action.playload.msg);
        case WbEventType.ClearComments:
            return state.clearComments();
        case WbEventType.SetComment:
            return state.editComment(action.playload.comment);
        default:
            break;      
    }
}