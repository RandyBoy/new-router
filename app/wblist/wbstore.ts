import { Injectable } from '@angular/core';
import { WeiBoModel  } from './wbmodel';

@Injectable()
export class WeiBoStore {
    weiBoDatas: WeiBoModel[] = [];

    constructor() {

    }

    GetALLWeiBo(): WeiBoModel[] {
        return [
            {
                headUrl: 'assets/img/12638218076582.jpg',
                nickName: 'summer',
                content: '一些美好的..',
                NoCollect: 132,
                NoForward: 202,
                NoComment: 142,
                NoPointGreat: 423,
                contentImgUrls: [
                    "assets/img/12836676803394.jpg",
                    "assets/img/12878226683223.jpg",
                    "assets/img/12881713571501.jpg",
                    "assets/img/12866953609188.jpg",
                    "assets/img/12861946828667.jpg",
                    "assets/img/12848193209875.jpg"
                ],
                comments: []
            },
            {
                headUrl: 'assets/img/12609793551649.jpg',
                nickName: 'cyan',
                content: '分享内容',
                NoCollect: 1032,
                NoForward: 2202,
                NoComment: 1342,
                NoPointGreat: 1423,
                contentImgUrls: [
                    "assets/img/12803199708390.jpg",
                    "assets/img/12806693126743.jpg"
                ],
                comments: []
            }
        ];
    }

}