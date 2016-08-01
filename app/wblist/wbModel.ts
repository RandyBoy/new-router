export interface WeiBoModel {
    id:number,
    headUrl: string,
    nickName: string,
    content: string,
    NoCollect: number,
    NoForward: number,
    NoComment: number,
    NoPointGreat: number,
    contentImgUrls: string[],
    comments: string[]
};