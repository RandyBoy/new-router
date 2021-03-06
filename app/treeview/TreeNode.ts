export class TreeNode {
    showIcon = false;
    expanded = false;
    icon = null;

    constructor(public key, public url, public name) {
        if (url) {
            this.showIcon = true;
            this.icon = this.getIcon();
        }
    }

    expand() {
        this.expanded = !this.expanded;
        this.icon = this.getIcon();
        let todos = [
            { id: 1, text: 'have lunch' }
        ];
        todos = [...todos, { id: 2, text: 'buy a cup of coffee' }];
    }

    private getIcon() {
        if (this.showIcon === true) {
            if (this.expanded) {
                return '- ';
            }
            return '+ ';
        }
        return null;
    }

}