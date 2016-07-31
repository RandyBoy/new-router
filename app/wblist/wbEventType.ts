export const AddComment = "AddComment";
export const DelComment = "DelComment"
export const ClearComments = "ClearComments";
export function addComment(playload) {
    return { type: AddComment, playload: playload };
}