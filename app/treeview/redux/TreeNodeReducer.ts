import {TreeNode} from '../TreeNode';
// import 'rxjs/rx';

export const treeNodeReducer = (state: any = [], action) => {
    switch (action.name) {

        case 'LOAD_NODES':
            return state.nodes.map(n => {
                return new TreeNode(n.key, n.url, n.name);
            });

    }
};