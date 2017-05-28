import BinaryTreeNode from './BinaryTreeNode';

type Action = (...args: any[]) => any;
type NullableNode<T> = BinaryTreeNode<T> | null;
type BinaryTreeParentChildTuple<T> = [NullableNode<T>, NullableNode<T>];

enum traversalStrategy {
  preOrder = <any>'preOrder',
  postOrder = <any>'postOrder',
  inOrder = <any>'inOrder'
}

interface IBinaryTree<T> {
  head: BinaryTreeNode<T>;
  count: number;
  add(value: T): void;
  contains(value: T): boolean;
  remove(value: T): boolean;
  preOrderTraversal(action: Action): void;
  postOrderTraversal(action: Action): void;
  inOrderTraversal(action: Action): void;
  clear(): void;
}

class BinaryTree<T> implements IBinaryTree<T> {
  private _head: BinaryTreeNode<T>;
  private _count: number;

  constructor() {
    this._head = null;
    this._count = 0;
  }

  get head() {
    return this._head;
  }

  get count() {
    return this._count;
  }

  add(value: T): void {
    const head = this._head;

    if (head === null) {
      this._head = new BinaryTreeNode(value);
    } else {
      this.addTo(head, value);
    }

    this._count += 1;
  }

  contains(value: T): boolean {
    return this.containsElement(value);
  }

  remove(value: T): boolean {
    let parentNode: NullableNode<T>;
    let targetNode: NullableNode<T>;
    let replacementNode: NullableNode<T>;

    [parentNode, targetNode] = this.find(this._head, null, value);

    if (targetNode === null) return false;

    const edge = targetNode.value < parentNode.value ? 'left' : 'right';

    if (targetNode.right === null) {
      replacementNode = targetNode.left;
    } else if (targetNode.right.left === null) {
      replacementNode = targetNode.right;
      replacementNode.left = targetNode.left;
    } else {
      let leftMostNodeParent: NullableNode<T>;
      // tslint:disable-next-line
      [leftMostNodeParent, replacementNode] = this.findLeftMostNode(targetNode.right.left, targetNode.right);

      leftMostNodeParent.left = replacementNode.right;
      replacementNode.left = targetNode.left;
      replacementNode.right = targetNode.right;
    }

    if (parentNode === null) {
      this._head = replacementNode;
    } else {
      parentNode[edge] = replacementNode;
    }

    this._count -= 1;

    return true;
  }

  preOrderTraversal(action: Action): T[] {
    return this.traverseWithStrategy('preOrder', action);
  }

  postOrderTraversal(action: Action): T[] {
    return this.traverseWithStrategy('postOrder', action);
  }

  inOrderTraversal(action: Action): T[] {
    return this.traverseWithStrategy('inOrder', action);
  }

  clear(): void {
    this._head = null;
    this._count = 0;
  }

  private addTo(node: BinaryTreeNode<T>, value: T): void {
    const edge = value < node.value ? 'left' : 'right';

    if (node[edge] === null) {
      node[edge] = new BinaryTreeNode(value);
    } else {
      this.addTo(node[edge], value);
    }
  }

  // tslint:disable-next-line
  private find(currentNode: BinaryTreeNode<T>, parentNode: BinaryTreeNode<T>, value: T): BinaryTreeParentChildTuple<T>{
    if (currentNode === null) return [null, null];
    if (currentNode.value === value) return [parentNode, currentNode];
    if (value < currentNode.value) return this.find(currentNode.left, currentNode, value);
    return this.find(currentNode.right, currentNode, value);
  }

  private containsElement(value: T): boolean {
    return this.find(this._head, null, value)[1] !== null;
  }
  // tslint:disable-next-line
  private findLeftMostNode(currentNode: BinaryTreeNode<T>, parentNode: BinaryTreeNode<T>): BinaryTreeParentChildTuple<T> {
    let leftMostNode: NullableNode<T>;
    let leftMostNodeParent: NullableNode<T>;

    leftMostNode = currentNode;
    leftMostNodeParent = parentNode;

    while (leftMostNode.left !== null) {
      leftMostNode = leftMostNode.left;
      leftMostNodeParent = leftMostNode;
    }

    return [leftMostNodeParent, leftMostNode];
  }

  private traverseWithStrategy(strategy: any, action: Action): T[] {
    const head = this._head;

    switch (strategy) {
      case traversalStrategy.preOrder:
        return this.traversePreOrder(head, action, []);
      case traversalStrategy.postOrder:
        return this.traversePostOrder(head, action, []);
      case traversalStrategy.inOrder:
      default:
        return this.traverseInOrder(head, action, []);
    }
  }

  private traversePreOrder(node: BinaryTreeNode<T>, action: Action, acc: T[]): T[] {
    if (node !== null) {
      action(node.value);
      acc.push(node.value);
      this.traversePreOrder(node.left, action, acc);
      this.traversePreOrder(node.right, action, acc);
      return acc;
    }
  }

  private traverseInOrder(node: BinaryTreeNode<T>, action: Action, acc: T[]): T[] {
    if (node !== null) {
      this.traverseInOrder(node.left, action, acc);
      action(node.value);
      acc.push(node.value);
      this.traverseInOrder(node.right, action, acc);
      return acc;
    }
  }

  private traversePostOrder(node: BinaryTreeNode<T>, action: Action, acc: T[]): T[] {
    if (node !== null) {
      this.traversePostOrder(node.left, action, acc);
      this.traversePostOrder(node.right, action, acc);
      action(node.value);
      acc.push(node.value);
      return acc;
    }
  }
}

export default BinaryTree;
