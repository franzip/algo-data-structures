interface Node<T> {
  value: T;
  next : Node<T> | null;
}

class LinkedListNode<T> implements Node<T> {
  private _value: T;
  private _next: LinkedListNode<T>;

  constructor(value: T) {
    this._value = value;
    this._next = null;
  }

  get value(): T {
    return this._value;
  }

  get next(): LinkedListNode<T> {
    return this._next;
  }

  set next(node: LinkedListNode<T>) {
    this._next = node;
  }
}

export default LinkedListNode;
