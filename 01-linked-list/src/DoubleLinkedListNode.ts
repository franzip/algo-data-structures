interface Node<T> {
  value: T;
  next : Node<T> | null;
  prev: Node<T> | null;
}

class DoubleLinkedListNode<T> implements Node<T> {
  private _value: T;
  private _prev: DoubleLinkedListNode<T>;
  private _next: DoubleLinkedListNode<T>;

  constructor(value: T) {
    this._value = value;
    this._prev = null;
    this._next = null;
  }

  get value(): T {
    return this._value;
  }

  get next(): DoubleLinkedListNode<T> {
    return this._next;
  }

  set next(node: DoubleLinkedListNode<T>) {
    this._next = node;
  }

  get prev(): DoubleLinkedListNode<T> {
    return this._prev;
  }

  set prev(node: DoubleLinkedListNode<T>) {
    this._prev = node;
  }
}

export default DoubleLinkedListNode;
