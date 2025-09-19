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
        if (this.root == null) {
            this.root = new Node(value);
            return;
        }
        let currentNode = this.root;
        this.insertRec(currentNode, value);
    }

    insertRec(currentNode, value) {
        if (currentNode.value == value) { // duplicates shouldn't be allowed
            return;
        }
        if (value > currentNode.value) {
            if (currentNode.right != null) {
                this.insertRec(currentNode.right, value);
            } else {
                currentNode.right = new Node(value);
            }
        } else {
            if (currentNode.left != null) {
                this.insertRec(currentNode.left, value);
            } else {
                currentNode.left = new Node(value);
            }
        }
    }

    deleteItem(value) {
        let currentNode = this.root;
        if (currentNode == null) {
            return null;
        }
        this.root = this.deleteItemRec(currentNode, value);
    }

    deleteItemRec(currentNode, value) {
        if(currentNode == null) {
            return null;
        }
        if (value > currentNode.value) {
            currentNode.right = this.deleteItemRec(currentNode.right, value);
        } else if (value < currentNode.value) {
            currentNode.left = this.deleteItemRec(currentNode.left, value);
        } else { // if value found
            if (currentNode.left == null) { // if current node doesn't have a left node, return the right node to replace the deleted node
                return currentNode.right;
            } else if (currentNode.right == null) { // return the left node to replace the deleted node (if both left and right null, then null is returned which means the deleted node is a leaf node, so no issues)
                return currentNode.left;
            } else { // both left and right nodes exist
                // find the smallest value in the right subtree to replace the deleted value (if we go to left tree, find the max value)
                let successor = this.getSuccessor(currentNode);
                currentNode.value = successor.value // replace the deleted value using the successor value
                currentNode.right = this.deleteItemRec(currentNode.right, currentNode.value); // we have to delete the successor value in the right tree since we now have the same in the replaced node
            }
        }
        return currentNode;
    }

    getSuccessor(node) {
        node = node.right;
        while (node.left != null) {
            node = node.left;
        }
        return node;
    }

    find(value) {
        if (this.root == null) {
            return false;
        }
        return this.findRec(this.root, value);
    }

    findRec(currentNode, value) {
        if (currentNode == null) {
            return false;
        }
        if (value > currentNode.value) {
            return this.findRec(currentNode.right, value);
        } else if (value < currentNode.value) {
            return this.findRec(currentNode.left, value);
        }
        return currentNode;
    }

    levelOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Call back function is required");
        }
        if (this.root == null) {
            return;
        }
        let queue = [this.root];
        while (queue.length > 0) { // run till queue is empty
            let currentNode = queue.shift(); // returns the first node from the queue
            callback(currentNode);
            if (currentNode.left) { // if the children exist, push them to queue
                queue.push(currentNode.left);
            }
            if (currentNode.right) {
                queue.push(currentNode.right);
            }
        }
    }



    inOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Call back function is required");
        }
        if (this.root == null) {
            return;
        }
        let currentNode = this.root;
        this.inOrderForEachRec(currentNode, callback);
    }

    inOrderForEachRec(currentNode, callback) {
        if (currentNode == null) {
            return;
        }
        this.inOrderForEachRec(currentNode.left, callback);
        callback(currentNode);
        this.inOrderForEachRec(currentNode.right, callback);
    }

    preOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Call back function is required");
        }
        if (this.root == null) {
            return;
        }
        let currentNode = this.root;
        this.preOrderForEachRec(currentNode, callback);
    }

    preOrderForEachRec(currentNode, callback) {
        if (currentNode == null) {
            return;
        }
        callback(currentNode);
        this.preOrderForEachRec(currentNode.left, callback);
        this.preOrderForEachRec(currentNode.right, callback);
    }

    postOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("Call back function is required");
        }
        if (this.root == null) {
            return;
        }
        let currentNode = this.root;
        this.postOrderForEachRec(currentNode, callback);
    }

    postOrderForEachRec(currentNode, callback) {
        if (currentNode == null) {
            return;
        }
        this.postOrderForEachRec(currentNode.left, callback);
        this.postOrderForEachRec(currentNode.right, callback);
        callback(currentNode);
    }

    height(value) {
        let currentNode = this.noOfEdges(this.root, 0, value);
        if (currentNode == null) {
            return null;
        }
        currentNode = currentNode[1];
        return this.heightRec(currentNode);
    }

    heightRec(currentNode) {
        if (currentNode == null) {
            return -1;
        }
        let leftHeight = this.heightRec(currentNode.left);
        let rightHeight = this.heightRec(currentNode.right);

        return Math.max(leftHeight, rightHeight) + 1;
    }

    depth(value) {
        if (this.root == null) {
            return;
        }
        let count = 0
        let currentNode = this.root;
        let result = this.noOfEdges(currentNode, count, value);
        return result ? result[0] : null;
    }

    noOfEdges(currentNode, count, value) {
        if (currentNode == null) {
            return null;
        }

        if (currentNode.value == value) {
            return [count, currentNode];
        } else if (value < currentNode.value) {
            count++;
            return this.noOfEdges(currentNode.left, count, value);
        } else {
            count++;
            return this.noOfEdges(currentNode.right, count, value);
        }
    }

    isBalanced() {
        let currentNode = this.root;
        return this.isBalancedRec(currentNode) >= 0;
    }

    isBalancedRec(currentNode) {
        if (currentNode == null) {
            return 0;
        }
        let leftHeight = this.isBalancedRec(currentNode.left);
        let rightHeight = this.isBalancedRec(currentNode.right);

        if (leftHeight == -1 || rightHeight == -1 || Math.abs(leftHeight - rightHeight) > 1) {
            return -1; // if anything is -1, then some subtree isn't balanced so we return -1. This bubbles up till the end.
        }

        return Math.max(leftHeight, rightHeight) + 1;
    }

    rebalance() {
        let array = [];
        this.inOrderForEach(node => array.push(node.value));
        this.root = this.buildTree(array);

    }

    // given in odin
    prettyPrint(node, prefix = '', isLeft = true) {
        if (node === null) {
            return;
        }
        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }
}

let tree = new Tree([10, 5, 15, 3, 7, 12, 18]);
tree.prettyPrint(tree.root) // Should show a balanced tree structure

// insert nodes
tree.insert(6);
tree.insert(8);
tree.insert(20);
console.log(tree.find(6).value); // 6
console.log(tree.find(8).value); // 8
console.log(tree.find(20).value); // 20
console.log(tree.find(999)); // false, not found
tree.prettyPrint(tree.root);

// check height 
console.log(tree.height(10)); // height of root node
console.log(tree.height(5));  // height of subtree
console.log(tree.height(999)); // null, value doesn't exist

// check depth
console.log(tree.depth(10)); // 0, root node
console.log(tree.depth(5));  // depth from root
console.log(tree.depth(6));  // depth from root
console.log(tree.depth(999)); // null

// check balance
console.log(tree.isBalanced()); // true for current balanced tree

// delete nodes
tree.deleteItem(3);   // leaf node
tree.deleteItem(15);  // node with two children
tree.deleteItem(999); // non-existent node
console.log(tree.find(3));  // false
console.log(tree.find(15)); // false
console.log(tree.isBalanced()); // depends on tree structure
tree.prettyPrint(tree.root);

// rebalance tree
tree.rebalance();  
console.log(tree.isBalanced()); // should be true
tree.prettyPrint(tree.root);

// traversals
console.log("In-order:");
tree.inOrderForEach(node => console.log(node.value));

console.log("Pre-order:");
tree.preOrderForEach(node => console.log(node.value));

console.log("Post-order:");
tree.postOrderForEach(node => console.log(node.value));

// edge cases
// insert into empty tree
let emptyTree = new Tree([]);
emptyTree.insert(50);
console.log("\n", emptyTree.root.value); // 50

// rebalance
console.log(tree.isBalanced());
emptyTree.rebalance();
console.log(emptyTree.root.value); // 50 (or null if deleted before)

// delete node
emptyTree.deleteItem(50);
console.log(emptyTree.root); // null

// rebalance
console.log(tree.isBalanced());
emptyTree.rebalance();
console.log(emptyTree.root); // should be null
