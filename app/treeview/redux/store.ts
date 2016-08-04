import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/Subject';
import {Observable} from 'rxjs/Observable';
import {Http, Response, Headers} from '@angular/http';
import {TreeNode} from '../TreeNode';
import {treeNodeReducer} from './TreeNodeReducer';
//import 'rxjs/rx';
import { AuthHttp, JwtHelper } from 'angular2-jwt';
// import fs = require('fs');

@Injectable()
export class Store {

    private dispatcher = new Subject<any>();
    private treeNodes = {};

    private nodes = {};

    constructor(private http: Http, private authHttp: AuthHttp) {
        this.dispatcher.subscribe((action) => this.handleAction(action));
    }

    show(msg:string){
        console.log(msg);
    }

    private handleAction(action) {
        // fs.stat("c:\test",(err,stats)=>{console.log(stats); });
        let contentHeaders = new Headers();
        contentHeaders.append('Accept', 'application/json');
        contentHeaders.append('Content-Type', 'application/json');
        if (action.name === 'LOAD_NODES') {
            if (this.nodes[action.key]) {
                this.treeNodes[action.key].next(this.nodes[action.key]);
            }
            else {
                this.http
                    .get(action.url, { headers: contentHeaders })
                    .map((res: Response) => { return res.json(); })
                    .subscribe(res => {
                        this.nodes[action.key] = treeNodeReducer(res, action);
                        this.treeNodes[action.key].next(this.nodes[action.key]);
                    });
            }
        }
       
    }

    getTreeNodes(key) {
        if (!this.treeNodes.hasOwnProperty(key)) {
            this.treeNodes[key] = new Subject<Array<TreeNode>>();
        }
        return this.treeNodes[key].asObservable();
    }

    dispatchAction(action) {
        this.dispatcher.next(action);
    }
}