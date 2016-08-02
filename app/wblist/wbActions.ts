import * as wbEventType from './wbEventType';

export function CreateAddComment(comment: string) {
    return {
        type: wbEventType.AddComment,
        playload: {
            msg: comment
        }
    }
}

export function CreateDelComment(comment: string) {
    return {
        type: wbEventType.DelComment,
        playload: {
            msg: comment
        }
    }
}

export function CreateClearComment() {
    return {
        type: wbEventType.ClearComments,
        playload: {}
    }
}

export function CreateOpenComment(comment: string) {
    return {
        type: wbEventType.OpenComment,
        playload: { comment: comment }
    }
}

export function CreateSaveComment(comment: string) {
    return {
        type: wbEventType.OpenComment,
        playload: { comment: comment }
    }
}
export function CreateSetComment(comment: string) {
    return {
        type: wbEventType.SetComment,
        playload: { comment: comment }
    }
}

