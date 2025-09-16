class Node {
    constructor(value) {
        this.value = value;
        this.right = null;
        this.left = null;
    }
}

class Tree {
    constructor(array) {
        this.root = this.buildTree(array);
    }

    buildTree(array) {
        array = array.sort((a, b) => a - b).filter((value, index, arr) => arr.indexOf(value) == index);
        return this.buildTreeRec(array, 0, array.length - 1);
    }

    buildTreeRec(array, start, end) {
        if (start > end) {
            return null;
        }

        let mid = Math.floor((start + end) / 2);
        let root = new Node(array[mid]);
        root.left = this.buildTreeRec(array, start, mid - 1);
        root.right = this.buildTreeRec(array, mid + 1, end);

        return root;
    }

    insert(value) {
        
    }

    deleteItem(value) {

    }

    find(value) {

    }

    levelOrderForEach(callback) {

    }

    inOrderForEach(callback) {

    }

    preOrderForEach(callback) {

    }

    postOrderForEach(callback) {

    }

    height(value) {

    }

    depth(value) {

    }

    isBalanced() {

    }

    rebalance() {

    }
}