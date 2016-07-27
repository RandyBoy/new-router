// $(window)
//     .load(function () {
//         setTimeout(function () {
//             $('.loading-container')
//                 .addClass('loading-inactive');
//         }, 0);
//     });


import { Component, OnInit } from '@angular/core';

@Component({
    moduleId: module.id,
    selector: 'loading',
    templateUrl: './loading.html',
    styleUrls: ['./loading.css']
})
export class Loading implements OnInit {

    loading: boolean = true;
    constructor() { }

    ngOnInit() {

    }

}