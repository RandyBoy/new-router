import {Component, Input, OnInit } from '@angular/core';
import { NgFor} from '@angular/common';
import {TreeNode} from './TreeNode';
import {TreeNodeService} from './TreeNodeService';

@Component({
    selector: 'treeView',
    moduleId: module.id,
    templateUrl: './TreeView.html',
    directives: [TreeView]
})

export class TreeView implements OnInit {

    @Input() root: TreeNode;
    children: any;
    items = [];
    subscription;

    constructor(private _treeNodeService: TreeNodeService) {
    }

    ngOnInit() {
        this.subscription = this._treeNodeService
            .getTreeNodes(this.root.key)
            .subscribe(res => {
                this.items = res;
            });
        this._treeNodeService.loadTreeNodes(this.root);
    }

    ngOnDestroy() {
        if (this.subscription) {
            this.subscription.unsubscribe();
        }
    }
}