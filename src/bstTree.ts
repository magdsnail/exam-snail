type ICompareFunction<T> = (a: T, b: T) => number;

function defaultCompare<T>(a: T, b: T): number {
    if (a === b) {
        return 0;
    } else if (a > b) {
        return -1;
    } else {
        return 1;
    }
}

class TreeNode<K> {
    public left: TreeNode<K> | undefined;
    public right: TreeNode<K> | undefined;
    public parent: TreeNode<K> | undefined;
    constructor(public key: K, parent?: TreeNode<K>) {
        this.left = undefined;
        this.right = undefined;
        this.parent = parent;
    }

    toString(): string {
        return `${this.key}`;
    }
}

class SearchTree<T> {
    protected root!: TreeNode<T> | null;

    constructor(protected compareFn: ICompareFunction<T> = defaultCompare) {
        this.root = null;
    }

    // 添加节点
    public add(key: T): void {
        // input your code
        if (this.root == null) {
            this.root = new TreeNode(key);
        } else {
            this.insertNode(this.root, key);
        }
    }

    private insertNode(node: TreeNode<T>, key: T) {
        // input your code
        if (this.compareFn(key, node.key) === -1) {
            if (node.left == null) {
                node.left = new TreeNode(key, node);
            } else {
                this.insertNode(node.left, key);
            }
        } else {
            if (node.right == null) {
                node.right = new TreeNode(key, node);
            } else {
                this.insertNode(node.right, key);
            }
        }
    }

    public searchNode(node: TreeNode<T>, key: T): boolean | TreeNode<T> {
        if (node == null) {
            return false;
        }

        if (this.compareFn(key, node.key) === -1) {
            return this.searchNode(<TreeNode<T>>node.left, key);
        } else if (this.compareFn(key, node.key) === 1) {
            return this.searchNode(<TreeNode<T>>node.right, key);
        } else {
            return true;
        }
    }

    public hasValue(value: T): boolean | TreeNode<T> {
        // input your code
        return this.searchNode(<TreeNode<T>>this.root, value);
    }

    public print() {
        // input your code
        return this.inOrderTraverseNode(<TreeNode<T>>this.root);
    }

    private inOrderTraverseNode(node: TreeNode<T>, result: T[] = []) {
        if (node != null) {
            this.inOrderTraverseNode(<TreeNode<T>>node.right, result);
            result.push(node.key);
            this.inOrderTraverseNode(<TreeNode<T>>node.left, result);
        }
        return result;
    }

    public remove(node: TreeNode<T> | null, key: T): null | TreeNode<T> {
        // input your code
        if (node == null) {
            return null;
        }
        if (this.compareFn(key, node.key) === -1) {
            node.left = <TreeNode<T>>this.remove(<TreeNode<T>>node.left, key);
            return node;
        } else if (this.compareFn(key, node.key) === 1) {
            node.right = <TreeNode<T>>this.remove(<TreeNode<T>>node.right, key);
            return node;
        } else {
            if (node.left == null && node.right == null) {
                node = null;
                return node;
            }

            if (node.left == null) {
                node = <TreeNode<T>>node.right;
                return node;
            } else if (node.right == null) {
                node = node.left;
                return node;
            }

            const aux = this.minNode(node.right);
            node.key = aux.key;
            node.right = <TreeNode<T>>this.remove(node.right, aux.key);
            return node;
        }
    }

    protected minNode(node: TreeNode<T>): TreeNode<T> {
        let current = node;
        while (current != null && current.left != null) {
            current = current.left;
        }
        return current;
    }

}

const t = new SearchTree()
t.add(2)
t.hasValue(2)  // true
t.add(4)
t.add(4)
t.add(3)
console.log(t.print())   // 升序输出，[2, 3, 4, 4]
t.remove(null, 2)