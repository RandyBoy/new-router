import {Component, OnInit} from '@angular/core';
import {TreeView} from './TreeView';
import {TreeNode} from './TreeNode';
import {Store} from './redux/store';
import {TreeNodeService} from './TreeNodeService';

@Component({
    selector: 'country-tree',
    template: `
    <tree-view [root]="node"></tree-view> 
               `,
    directives: [TreeView],
    providers: [Store, TreeNodeService]
})
export class CountryDemo implements OnInit {
    node: TreeNode = null;

    ngOnInit() {
        this.node = new TreeNode('root', './assets/countries.json', '');
    }
}