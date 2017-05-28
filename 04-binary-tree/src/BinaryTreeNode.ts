interface IBinaryTreeNode<T> {
  value: T;
  left : IBinaryTreeNode<T> | null;
  right: IBinaryTreeNode<T> | null;
}

class BinaryTreeNode<T> implements IBinaryTreeNode<T> {
  private _value: T;
  private _left: BinaryTreeNode<T>;
  private _right: BinaryTreeNode<T>;

  constructor(value: T) {
    this._value = value;
    this._left = null;
    this._right = null;
  }

  get value(): T {
    return this._value;
  }

  get left(): BinaryTreeNode<T> {
    return this._left;
  }

  set left(node: BinaryTreeNode<T>) {
    this._left = node;
  }

  get right(): BinaryTreeNode<T> {
    return this._right;
  }

  set right(node: BinaryTreeNode<T>) {
    this._right = node;
  }
}

export default BinaryTreeNode;
