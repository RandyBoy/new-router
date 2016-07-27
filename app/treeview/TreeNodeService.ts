import {Injectable} from '@angular/core';
import {Store} from './redux/store';
import {Observable} from 'rxjs/rx';

@Injectable()
export class TreeNodeService {

    constructor(private _store: Store) {
    }
    getTreeNodes(key: any): Observable<any> {
        return this._store.getTreeNodes(key);
    }

    loadTreeNodes(root): this {
        if (root.url) {
            this._store.dispatchAction({ key: root.key, url: root.url, name: 'LOAD_NODES' });
        }
        this._store['show']('show');
        return this;
    }
}